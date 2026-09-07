"use client";

import { Music, Radio } from "lucide-react";
import { useEffect, useState } from "react";

type NowPlayingResponse = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  radioName?: string;
  listenUrl?: string;
};

type RadioWidgetProps = {
  className?: string;
  isEditing?: boolean;
};

const DEFAULT_LISTEN_URL = "https://yantarne.fm/";
const POLL_INTERVAL_MS = 10_000;

function EqualizerBars() {
  return (
    <span className="flex h-3 items-end gap-0.5" aria-hidden="true">
      <span className="equalizer-bar equalizer-bar-1 w-1 rounded-full bg-red-500" />
      <span className="equalizer-bar equalizer-bar-2 w-1 rounded-full bg-red-500" />
      <span className="equalizer-bar equalizer-bar-3 w-1 rounded-full bg-red-500" />
      <span className="equalizer-bar equalizer-bar-4 w-1 rounded-full bg-red-500" />
    </span>
  );
}

export default function RadioWidget({
  className = "",
  isEditing = false,
}: RadioWidgetProps) {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingResponse>({
    isPlaying: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchNowPlaying() {
      try {
        const response = await fetch("/api/now-playing", {
          cache: "no-store",
        });
        const data = (await response.json()) as NowPlayingResponse;

        if (isMounted) {
          setNowPlaying(data);
        }
      } catch {
        if (isMounted) {
          setNowPlaying({ isPlaying: false });
        }
      }
    }

    fetchNowPlaying();
    const intervalId = window.setInterval(fetchNowPlaying, POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const listenUrl = nowPlaying.listenUrl || DEFAULT_LISTEN_URL;
  const title = nowPlaying.title || "Yantarne FM";
  const artist = nowPlaying.artist || nowPlaying.radioName || "Онлайн-радіо";
  const isLive = nowPlaying.isPlaying;

  const content = (
    <>
      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-red-500/10 blur-[40px]" />

      <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-red-600 to-red-900 shadow-lg shadow-red-900/30">
        <Music className="h-7 w-7 text-white/90" />
      </div>

      <div className="z-10 min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          {isLive ? (
            <>
              <EqualizerBars />
              <p className="text-xs font-medium uppercase tracking-wide text-red-500">
                В ЕФІРІ
              </p>
            </>
          ) : (
            <>
              <Radio className="h-3.5 w-3.5 text-red-500" />
              <p className="text-xs font-medium uppercase tracking-wide text-red-500">
                ОФЛАЙН
              </p>
            </>
          )}
        </div>
        <h3 className="truncate text-base font-semibold text-text-primary">
          {title}
        </h3>
        <p className="truncate text-sm text-text-secondary">{artist}</p>
      </div>

      <Radio className="absolute right-5 top-5 h-5 w-5 text-red-500 opacity-80" />
    </>
  );

  const sharedClassName = `bento-card col-span-2 row-span-1 relative flex items-center gap-5 overflow-hidden rounded-[24px] border border-red-900/30 bg-gradient-to-br from-red-900/20 to-black p-6 transition hover:border-red-700/40 ${className}`;

  if (isEditing) {
    return <div className={sharedClassName}>{content}</div>;
  }

  return (
    <a
      href={listenUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${sharedClassName} cursor-pointer hover:from-red-900/30`}
    >
      {content}
    </a>
  );
}
