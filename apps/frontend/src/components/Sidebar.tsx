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
    iconClass: "bg-surface-elevated text-text-secondary group-hover:text-white transition",
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
    iconClass: "bg-red-500/10 text-red-500",
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
    iconClass: "bg-surface-elevated text-text-secondary group-hover:text-white transition",
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
    iconClass: "bg-surface-elevated text-text-secondary group-hover:text-white transition",
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
    iconClass: "bg-surface-elevated text-text-secondary group-hover:text-white transition",
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
    iconClass: "bg-surface-elevated text-text-secondary group-hover:text-white transition",
  },
];

export default function Sidebar({ widgetCount, onAddWidget }: { widgetCount: number; onAddWidget: (name: string) => void }) {
  const atLimit = widgetCount >= 6;
  return (
    <aside className="w-full md:w-[260px] h-full bg-surface border-r border-border flex flex-col flex-shrink-0 z-20">
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
            className={`group flex w-full items-center gap-3 p-3 bg-background border border-border rounded-xl hover:border-border-hover transition-colors ${atLimit ? "pointer-events-none cursor-not-allowed opacity-40" : "cursor-grab active:cursor-grabbing"}`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.iconClass}`}
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
