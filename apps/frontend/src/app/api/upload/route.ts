import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are supported" }, { status: 400 });
  }
  if (file.size > 10_000_000) return NextResponse.json({ error: "File is too large" }, { status: 413 });

  const blob = await put(`resumes/${session.user.id}/${file.name}`, file, { access: "public", addRandomSuffix: true });
  return NextResponse.json({ url: blob.url });
}