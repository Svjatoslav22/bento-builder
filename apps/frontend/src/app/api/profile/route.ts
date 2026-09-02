import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const profileFields = {
  id: true,
  userId: true,
  username: true,
  isOnboarded: true,
  name: true,
  title: true,
  bio: true,
  avatarUrl: true,
  linkedinUrl: true,
  githubUrl: true,
  resumeUrl: true,
} as const;

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: profileFields,
  });

  return NextResponse.json(profile);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();

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

  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      username,
      isOnboarded: true,
      name,
      title: String(formData.get("title") ?? "").trim() || null,
      bio: String(formData.get("bio") ?? "").trim() || null,
      avatarUrl: await fileDataUrl(formData.get("avatar")),
      linkedinUrl: String(formData.get("linkedinUrl") ?? "").trim() || null,
      githubUrl: String(formData.get("githubUrl") ?? "").trim() || null,
      resumeUrl: await fileDataUrl(formData.get("resume")),
    },
    update: { username, isOnboarded: true, name },
    select: profileFields,
  });

  return NextResponse.json(profile, { status: 201 });
}

async function fileDataUrl(value: FormDataEntryValue | null) {
  if (!(value instanceof File) || value.size === 0) return null;
  if (value.size > 2_000_000) return null;
  const bytes = Buffer.from(await value.arrayBuffer());
  return `data:${value.type || "application/octet-stream"};base64,${bytes.toString("base64")}`;
}