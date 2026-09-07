"use client";

import { Music, Pause, Play, Radio } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

const STREAM_URL = "https://yantarne.fm/yantarne;";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsAudioPlaying(true);
    const handlePause = () => setIsAudioPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
    };
  }, []);

  function togglePlay(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (isEditing || !audioRef.current) return;

    if (!isAudioPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsAudioPlaying(true))
          .catch((err) => {
            console.error("Audio playback failed:", err);
            setIsAudioPlaying(false);
          });
      }
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  }

  const title = nowPlaying.title || "Yantarne FM";
  const artist = nowPlaying.artist || nowPlaying.radioName || "Онлайн-радіо";
  const isLive = nowPlaying.isPlaying;

  return (
    <div
      className={`bento-card col-span-2 row-span-1 relative overflow-hidden rounded-[24px] border border-red-900/30 bg-gradient-to-br from-red-900/20 to-black p-6 transition hover:border-red-700/40 ${className}`}
    >
      <audio ref={audioRef} src={STREAM_URL} preload="none" />

      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-red-500/10 blur-[40px]" />

      <div className="relative z-10 flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-5">
          <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-red-600 to-red-900 shadow-lg shadow-red-900/30">
            <Music className="h-7 w-7 text-white/90" />
          </div>

          <div className="min-w-0 flex-1">
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
        </div>

        <button
          type="button"
          onClick={togglePlay}
          disabled={isEditing}
          aria-label={isAudioPlaying ? "Pause radio" : "Play radio"}
          className="flex-shrink-0 rounded-full p-2 text-red-500 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isAudioPlaying ? (
            <Pause className="h-6 w-6 fill-current" />
          ) : (
            <Play className="h-6 w-6 fill-current" />
          )}
        </button>
      </div>
    </div>
  );
}
