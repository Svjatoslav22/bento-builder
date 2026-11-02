type TechStackWidgetProps = {
  className?: string;
  isEditing?: boolean;
  technologies?: string[] | string | null;
};

const DEFAULT_TECHNOLOGIES = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Tailwind",
  "PostgreSQL",
];

const BADGE_CLASS =
  "flex items-center gap-2 rounded-xl border border-zinc-700/50 bg-[#18181B] px-2.5 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-500/50";

export function parseTechnologies(value?: string[] | string | null): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    if (!value.trim()) return [];
    return value
      .split(/[,|\n]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return DEFAULT_TECHNOLOGIES;
}

export default function TechStackWidget({
  className = "",
  technologies,
}: TechStackWidgetProps) {
  const items = parseTechnologies(technologies);

  return (
    <div
      className={`bento-card col-span-2 row-span-1 relative flex flex-col overflow-hidden rounded-[24px] border border-border bg-surface px-5 pt-4 pb-3.5 ${className}`}
    >
      <div className="relative z-10 mb-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
            Stack
          </p>
          <h3 className="text-base font-semibold leading-tight text-text-primary">Tech Stack</h3>
        </div>
        <span className="rounded-full border border-zinc-700/50 bg-zinc-800/60 px-2.5 py-0.5 text-[10px] font-medium text-zinc-300">
          {items.length} tools
        </span>
      </div>

      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {items.map((tech, index) => (
            <div key={`${tech}-${index}`} className={BADGE_CLASS}>
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400" />
              <span className="truncate">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
