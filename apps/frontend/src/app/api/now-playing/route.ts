import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch("https://complex.in.ua/status-json.xsl", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch from Icecast");

    const data = await response.json();
    const sources = Array.isArray(data?.icestats?.source)
      ? data.icestats.source
      : [data?.icestats?.source];
    const mount = sources.find(
      (s: { listenurl?: string; title?: string }) =>
        s && s.listenurl && s.listenurl.includes("yantarne"),
    );
    const rawTitle = mount?.title || "";

    let artist = "";
    let title = rawTitle;
    if (rawTitle.includes("-")) {
      const parts = rawTitle.split("-");
      artist = parts[0].trim();
      title = parts.slice(1).join("-").trim();
    }

    return NextResponse.json({
      isPlaying: true,
      title: title || "Ефір Yantarne FM",
      artist: artist,
      radioName: "Yantarne FM",
      listenUrl: "https://yantarne.fm/",
    });
  } catch (error) {
    return NextResponse.json({ isPlaying: false });
  }
}
