type PortfolioWidgetProps = {
  className?: string;
  isEditing?: boolean;
  widget?: { content?: { url?: string } };
};

export default function PortfolioWidget({ className = "", isEditing = false, widget }: PortfolioWidgetProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => { if (isEditing) event.preventDefault(); };
  return (
    <a
      href={widget?.content?.url || "#"}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`bento-card col-span-2 row-span-1 bg-surface border border-border rounded-[24px] p-6 relative overflow-hidden group block hover:border-[#3F3F46] transition-all ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex flex-col justify-center h-full max-w-[55%]">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-white/10 transition-colors">
          <svg
            className="w-5 h-5 text-text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-text-primary font-semibold text-lg">Portfolio</h3>
        <p className="text-text-secondary text-sm flex items-center gap-1 mt-1 group-hover:text-white transition-colors">
          View my work{" "}
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </p>
      </div>

      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-48 h-32 bg-[#09090B] border border-border rounded-lg shadow-2xl transform group-hover:-translate-x-2 transition-transform duration-500 flex flex-col pointer-events-none">
        <div className="flex gap-1.5 p-2.5 border-b border-border bg-[#121214]">
          <div className="w-2 h-2 rounded-full bg-[#3F3F46]" />
          <div className="w-2 h-2 rounded-full bg-[#3F3F46]" />
          <div className="w-2 h-2 rounded-full bg-[#3F3F46]" />
        </div>
        <div className="p-3 flex-1 space-y-2.5">
          <div className="h-2 w-3/4 bg-[#27272A] rounded-full" />
          <div className="h-2 w-1/2 bg-[#27272A] rounded-full" />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="h-10 bg-[#18181B] rounded border border-border/50" />
            <div className="h-10 bg-[#18181B] rounded border border-border/50" />
          </div>
        </div>
      </div>
    </a>
  );
}
