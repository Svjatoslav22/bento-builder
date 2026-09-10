"use client";

type GithubStatsWidgetProps = {
  className?: string;
  isEditing?: boolean;
  githubUrl?: string | null;
  username?: string | null;
};

function extractGithubUsername(githubUrl?: string | null, username?: string | null) {
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

  return username || "octocat";
}

export default function GithubStatsWidget({
  className = "",
  isEditing = false,
  githubUrl,
  username,
}: GithubStatsWidgetProps) {
  const handle = extractGithubUsername(githubUrl, username);
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${encodeURIComponent(handle)}&show_icons=true&theme=dark&hide_border=true&bg_color=121214&title_color=22d3ee&icon_color=fb923c&text_color=a1a1aa`;
  const profileUrl = `https://github.com/${handle}`;

  const content = (
    <>
      <div className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-orange-400/90">
            Activity
          </p>
          <h3 className="truncate text-base font-semibold text-text-primary">
            GitHub Stats
          </h3>
          <p className="truncate text-xs text-text-secondary">@{handle}</p>
        </div>
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-white/5">
          <svg className="h-4 w-4 text-text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.701-1.333-1.701-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-border/60 bg-[#0d1117]/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={statsUrl}
          alt={`${handle} GitHub stats`}
          className="h-full w-full object-contain object-left"
        />
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
