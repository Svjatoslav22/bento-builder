import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: { widgets: true },
  });

  return NextResponse.json({ profile });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const username = String(body.username ?? "").trim().toLowerCase();
  const name = String(body.name ?? "").trim();

  if (!/^[a-z0-9_]{3,30}$/.test(username) || !name) {
    return NextResponse.json(
      { error: "Username must be 3-30 characters and name is required" },
      { status: 400 },
    );
  }

  const existing = await prisma.profile.findUnique({ where: { username } });
  if (existing && existing.userId !== session.user.id) {
    return NextResponse.json({ error: "Username is already taken" }, { status: 409 });
  }

  const profile = await prisma.profile.create({
    data: {
      userId: session.user.id,
      username,
      isOnboarded: true,
      name,
      title: String(body.title ?? "").trim() || null,
      bio: String(body.bio ?? "").trim() || null,
      avatarUrl: body.avatarUrl || null,
      linkedinUrl: String(body.linkedinUrl ?? "").trim() || null,
      githubUrl: String(body.githubUrl ?? "").trim() || null,
      resumeUrl: body.resumeUrl || null,
      widgets: { create: normalizeWidgets(body.defaultWidgets) },
    },
    include: { widgets: true },
  });

  return NextResponse.json(profile, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } });
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const widgets = normalizeWidgets(body.widgets);
  if (widgets.length > 6) return NextResponse.json({ error: "Maximum 6 widgets" }, { status: 400 });
  const ownedWidgetIds = new Set((await prisma.widget.findMany({ where: { profileId: profile.id }, select: { id: true } })).map((widget) => widget.id));

  const saved = await prisma.$transaction(async (transaction) => {
    await transaction.profile.update({
      where: { id: profile.id },
      data: {
        username: String(body.username ?? profile.username).trim().toLowerCase(),
        name: body.name ?? profile.name,
        title: body.title ?? profile.title,
        bio: body.bio ?? profile.bio,
        avatarUrl: body.avatarUrl ?? profile.avatarUrl,
        linkedinUrl: body.linkedinUrl ?? profile.linkedinUrl,
        githubUrl: body.githubUrl ?? profile.githubUrl,
        resumeUrl: body.resumeUrl ?? profile.resumeUrl,
      },
    });

      const safeWidgets = widgets.map((widget) => ownedWidgetIds.has(widget.id || "") ? widget : { ...widget, id: undefined });
      const ids = safeWidgets.flatMap((widget) => widget.id ? [widget.id] : []);
      await transaction.widget.deleteMany({ where: { profileId: profile.id, ...(ids.length ? { id: { notIn: ids } } : {}) } });
      for (const [position, widget] of safeWidgets.entries()) {
      if (widget.id) {
        await transaction.widget.update({ where: { id: widget.id }, data: { type: widget.type, sizePreset: widget.sizePreset, position, config: widget.config ?? {} } });
      } else {
        await transaction.widget.create({ data: { profileId: profile.id, type: widget.type, sizePreset: widget.sizePreset, position, config: widget.config ?? {} } });
      }
    }

    return transaction.profile.findUnique({ where: { id: profile.id }, include: { widgets: true } });
  });

  return NextResponse.json(saved);
}

function normalizeWidgets(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((widget, position) => {
    const item = widget as Record<string, unknown>;
    return {
      id: typeof item.id === "string" ? item.id : undefined,
      type: String(item.type ?? item.id ?? "profile"),
      sizePreset: String(item.sizePreset ?? item.size ?? "M"),
      position,
      config: item.config && typeof item.config === "object" ? item.config : {},
    };
  });
}