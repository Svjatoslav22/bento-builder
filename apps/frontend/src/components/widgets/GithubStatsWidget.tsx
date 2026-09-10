"use client";

import { useEffect, useState } from "react";

type GithubStatsWidgetProps = {
  className?: string;
  isEditing?: boolean;
  githubUrl?: string | null;
  username?: string | null;
};

function extractGithubUsername(githubUrl?: string | null, username?: string | null): string | null {
  if (username?.trim()) {
    return username.trim().replace(/^@/, "");
  }

  if (githubUrl) {
    try {
      const pathname = new URL(githubUrl).pathname.replace(/^\/+|\/+$/g, "");
      const handle = pathname.split("/")[0];
      if (handle) return handle;
    } catch {
      const match = githubUrl.match(/github\.com\/([^/?#]+)/i);
      if (match?.[1]) return match[1];
    }
  }

  return null;
}

function GithubFallback({
  handle,
  profileUrl,
  message,
}: {
  handle: string | null;
  profileUrl: string;
  message: string;
}) {
  const avatarUrl = handle ? `https://github.com/${encodeURIComponent(handle)}.png?size=120` : null;

  return (
    <div className="flex h-full min-h-[110px] flex-col items-center justify-center gap-3 p-4 text-center">
      {avatarUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={`${handle} avatar`}
          className="h-14 w-14 rounded-full border border-border object-cover"
        />
      )}
      <div>
        {handle && <p className="text-sm font-medium text-text-primary">@{handle}</p>}
        <p className={`text-xs text-text-secondary ${handle ? "mt-1" : ""}`}>{message}</p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs font-medium text-cyan-400 hover:text-cyan-300"
        >
          Open GitHub profile →
        </a>
      </div>
    </div>
  );
}

export default function GithubStatsWidget({
  className = "",
  isEditing = false,
  githubUrl,
  username,
}: GithubStatsWidgetProps) {
  const handle = extractGithubUsername(githubUrl, username);
  const chartUrl = handle ? `https://ghchart.rshah.org/${encodeURIComponent(handle)}` : null;
  const avatarUrl = handle ? `https://github.com/${encodeURIComponent(handle)}.png?size=120` : null;
  const profileUrl = handle ? `https://github.com/${handle}` : githubUrl || "https://github.com";
  const [chartFailed, setChartFailed] = useState(false);

  useEffect(() => {
    setChartFailed(false);
  }, [handle]);

  const content = (
    <>
      <div className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-orange-400/90">
            Activity
          </p>
          <h3 className="truncate text-base font-semibold text-text-primary">
            GitHub Activity
          </h3>
          {handle && <p className="truncate text-xs text-text-secondary">@{handle}</p>}
        </div>
        {avatarUrl && (
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt={`${handle} avatar`}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-border/60 bg-[#0d1117] p-2">
        {!handle || chartFailed ? (
          <GithubFallback
            handle={handle}
            profileUrl={profileUrl}
            message={
              !handle
                ? "Add a GitHub username in widget settings or profile URL."
                : "Contribution chart unavailable — open GitHub profile."
            }
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={chartUrl}
            src={chartUrl || ""}
            alt={`${handle} GitHub contribution activity`}
            className="w-full h-auto object-contain"
            onError={() => setChartFailed(true)}
          />
        )}
      </div>
    </>
  );

  if (isEditing) {
    return (
      <div
        className={`bento-card col-span-2 row-span-1 relative flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-surface p-5 ${className}`}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`bento-card col-span-2 row-span-1 relative flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-surface p-5 transition hover:border-cyan-500/30 ${className}`}
    >
      {content}
    </a>
  );
}
