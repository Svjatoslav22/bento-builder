export const dynamic = "force-dynamic";

const YANTARNE_STATUS_URL =
  "https://yantarne.fm/status-json.xsl?mount=/yantarne";
const LISTEN_URL = "https://yantarne.fm/";

type IcecastSource = {
  title?: string;
};

type IcecastResponse = {
  icestats?: {
    source?: IcecastSource | IcecastSource[];
  };
};

function parseArtistAndTitle(rawTitle: string) {
  const trimmed = rawTitle.trim();

  if (!trimmed) {
    return { artist: "", title: "" };
  }

  const dashIndex = trimmed.indexOf(" - ");
  if (dashIndex !== -1) {
    return {
      artist: trimmed.slice(0, dashIndex).trim(),
      title: trimmed.slice(dashIndex + 3).trim(),
    };
  }

  const simpleDashIndex = trimmed.indexOf("-");
  if (simpleDashIndex !== -1) {
    return {
      artist: trimmed.slice(0, simpleDashIndex).trim(),
      title: trimmed.slice(simpleDashIndex + 1).trim(),
    };
  }

  return { artist: "", title: trimmed };
}

function getRawTitle(data: IcecastResponse) {
  const source = Array.isArray(data?.icestats?.source)
    ? data.icestats.source[0]
    : data?.icestats?.source;

  return source?.title;
}

export async function GET() {
  try {
    const response = await fetch(YANTARNE_STATUS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Accept: "application/json, text/plain, */*",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Yantarne FM status request failed: ${response.status}`);
    }

    const data = (await response.json()) as IcecastResponse;
    const rawTitle = getRawTitle(data);

    if (!rawTitle) {
      throw new Error("No track title found in Icecast response");
    }

    const { artist, title } = parseArtistAndTitle(rawTitle);

    return Response.json({
      isPlaying: true,
      title,
      artist,
      radioName: "Yantarne FM",
      listenUrl: LISTEN_URL,
    });
  } catch (error) {
    console.error("Radio API Error:", error);
    return Response.json({ isPlaying: false });
  }
}
