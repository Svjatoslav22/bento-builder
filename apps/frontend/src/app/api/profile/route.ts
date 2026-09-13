import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: { widgets: true },
    });

    return NextResponse.json({ profile: profile ?? null });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("GET /api/profile", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await readJson(request);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const username = optionalText(body.username)?.toLowerCase() ?? "";
    const name = optionalText(body.name) ?? "";

    if (!/^[a-z0-9_]{3,30}$/.test(username) || !name) {
      return NextResponse.json(
        { error: "Username must be 3-30 characters and name is required" },
        { status: 400 },
      );
    }

    const existingUsername = await prisma.profile.findUnique({ where: { username } });
    if (existingUsername && existingUsername.userId !== session.user.id) {
      return NextResponse.json({ error: "Username is already taken" }, { status: 409 });
    }

    const profileFields = {
      username,
      isOnboarded: true,
      name,
      title: optionalText(body.title),
      bio: optionalText(body.bio),
      avatarUrl: optionalText(body.avatarUrl),
      linkedinUrl: optionalText(body.linkedinUrl),
      githubUrl: optionalText(body.githubUrl),
      resumeUrl: optionalText(body.resumeUrl),
    };
    const defaultWidgets = normalizeWidgets(body.defaultWidgets);

    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        ...profileFields,
        widgets: { create: defaultWidgets.map(({ id: _id, ...widget }) => widget) },
      },
      update: profileFields,
      include: { widgets: true },
    });

    if (profile.widgets.length === 0 && defaultWidgets.length > 0) {
      await prisma.widget.createMany({
        data: defaultWidgets.map(({ id: _id, ...widget }) => ({
          profileId: profile.id,
          ...widget,
        })),
      });
    }

    const saved = await prisma.profile.findUnique({
      where: { id: profile.id },
      include: { widgets: true },
    });

    return NextResponse.json(saved, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("POST /api/profile", errorMessage);
    if (isUniqueConstraint(error)) {
      return NextResponse.json({ error: "Username is already taken" }, { status: 409 });
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await readJson(request);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } });
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const nextUsername = optionalText(body.username)?.toLowerCase() ?? profile.username;
    if (nextUsername !== profile.username) {
      const taken = await prisma.profile.findUnique({ where: { username: nextUsername } });
      if (taken && taken.id !== profile.id) {
        return NextResponse.json({ error: "Username is already taken" }, { status: 409 });
      }
    }

    const shouldSyncWidgets = Array.isArray(body.widgets);
    const widgets = shouldSyncWidgets ? normalizeWidgets(body.widgets) : [];
    if (widgets.length > 6) return NextResponse.json({ error: "Maximum 6 widgets" }, { status: 400 });

    const ownedWidgetIds = new Set(
      (await prisma.widget.findMany({ where: { profileId: profile.id }, select: { id: true } })).map((widget) => widget.id),
    );

    const saved = await prisma.$transaction(async (transaction) => {
      await transaction.profile.update({
        where: { id: profile.id },
        data: {
          username: nextUsername,
          name: optionalText(body.name) ?? profile.name,
          title: fieldOrCurrent(body, "title", profile.title),
          bio: fieldOrCurrent(body, "bio", profile.bio),
          avatarUrl: fieldOrCurrent(body, "avatarUrl", profile.avatarUrl),
          linkedinUrl: fieldOrCurrent(body, "linkedinUrl", profile.linkedinUrl),
          githubUrl: fieldOrCurrent(body, "githubUrl", profile.githubUrl),
          resumeUrl: fieldOrCurrent(body, "resumeUrl", profile.resumeUrl),
        },
      });

      if (shouldSyncWidgets) {
        const safeWidgets = widgets.map((widget) =>
          ownedWidgetIds.has(widget.id || "") ? widget : { ...widget, id: undefined },
        );
        const ids = safeWidgets.flatMap((widget) => (widget.id ? [widget.id] : []));
        await transaction.widget.deleteMany({
          where: { profileId: profile.id, ...(ids.length ? { id: { notIn: ids } } : {}) },
        });
        for (const [position, widget] of safeWidgets.entries()) {
          const data = {
            type: widget.type,
            sizePreset: widget.sizePreset,
            position,
            config: widget.config,
          };
          if (widget.id) {
            await transaction.widget.update({ where: { id: widget.id }, data });
          } else {
            await transaction.widget.create({ data: { profileId: profile.id, ...data } });
          }
        }
      }

      return transaction.profile.findUnique({ where: { id: profile.id }, include: { widgets: true } });
    });

    return NextResponse.json(saved);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("PATCH /api/profile", errorMessage);
    if (isUniqueConstraint(error)) {
      return NextResponse.json({ error: "Username is already taken" }, { status: 409 });
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

function optionalText(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text.length ? text : null;
}

function fieldOrCurrent(body: Record<string, unknown>, key: string, current: string | null) {
  if (!(key in body)) return current;
  return optionalText(body[key]);
}

async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const value = await request.json();
    return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function isUniqueConstraint(error: unknown) {
  if (error == null || typeof error !== "object") return false;
  return "code" in error && (error as { code: unknown }).code === "P2002";
}

function jsonValue(value: unknown): Prisma.InputJsonValue {
  try {
    return JSON.parse(JSON.stringify(value ?? {})) as Prisma.InputJsonValue;
  } catch {
    return {};
  }
}

function normalizeWidgets(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((widget, position) => {
    const item = widget && typeof widget === "object" ? (widget as Record<string, unknown>) : {};
    const type = String(item.type ?? "profile");
    const rawConfig = item.config && typeof item.config === "object" && !Array.isArray(item.config)
      ? { ...(item.config as Record<string, unknown>) }
      : {};

    if (type === "tech-stack") {
      rawConfig.technologies = serializeTechnologies(rawConfig.technologies);
    }

    return {
      id: typeof item.id === "string" && item.id.trim() ? item.id : undefined,
      type,
      sizePreset: String(item.sizePreset ?? item.size ?? "M"),
      position,
      config: jsonValue(rawConfig),
    };
  });
}

function serializeTechnologies(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean).join(", ");
  }
  return "";
}
