import BentoLogo from "@/components/BentoLogo";

const iconClass =
  "bg-zinc-800/40 border border-zinc-800 text-zinc-400 group-hover:text-zinc-200 transition";

const libraryItems = [
  {
    name: "Profile Info",
    description: "Avatar, bio & socials",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    name: "Yantarne FM",
    description: "Live radio stream",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 8h14a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12h6M12 9v6"
        />
      </svg>
    ),
  },
  {
    name: "Tech Stack",
    description: "React, Next.js & more",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    name: "GitHub Activity",
    description: "Repos & contributions",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.701-1.333-1.701-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "Portfolio",
    description: "Project showcase",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    name: "AI Chat",
    description: "Interactive clone",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    ),
  },
  {
    name: "Location",
    description: "Timezone info",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    name: "Resume",
    description: "Downloadable PDF",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2v6h6M8 13h8M8 17h6" />
      </svg>
    ),
  },
];

export default function Sidebar({ widgetCount, onAddWidget }: { widgetCount: number; onAddWidget: (name: string) => void }) {
  const atLimit = widgetCount >= 6;
  return (
    <aside className="w-full md:w-[260px] h-full bg-surface border-r border-border flex flex-col flex-shrink-0 z-20">
      <div className="border-b border-border px-5 py-4">
        <BentoLogo />
      </div>

      <div className="p-5 border-b border-border flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary tracking-wide">
          Add Widget
          {atLimit && <span className="ml-2 text-[10px] font-normal text-text-secondary">Max 6 widgets reached</span>}
        </h2>
        <div className="w-6 h-6 rounded bg-surface-elevated border border-border flex items-center justify-center text-text-secondary cursor-pointer hover:text-white transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-3">
        <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wider mb-2">
          Available Components
        </p>

        {libraryItems.map((item) => (
          <button
            key={item.name}
            type="button"
            disabled={atLimit}
            onClick={() => onAddWidget(item.name)}
            className={`group flex w-full items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors ${atLimit ? "pointer-events-none cursor-not-allowed opacity-40" : "cursor-grab active:cursor-grabbing"}`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconClass}`}
            >
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">{item.name}</p>
              <p className="text-[10px] text-text-secondary">{item.description}</p>
            </div>
            <svg
              className="w-4 h-4 text-border group-hover:text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8h16M4 16h16"
              />
            </svg>
          </button>
        ))}
      </div>
    </aside>
  );
}
