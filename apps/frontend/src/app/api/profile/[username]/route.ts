import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;
  const profile = await prisma.profile.findUnique({
    where: { username: username.toLowerCase() },
    include: { widgets: true },
  });

  return profile
    ? NextResponse.json(profile)
    : NextResponse.json({ error: "Profile not found" }, { status: 404 });
}