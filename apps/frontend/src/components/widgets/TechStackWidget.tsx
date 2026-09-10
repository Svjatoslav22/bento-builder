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
  "flex items-center gap-2 rounded-xl border border-zinc-700/50 bg-[#18181B] px-3 py-2.5 text-xs font-medium text-zinc-200";

export function parseTechnologies(value?: string[] | string | null): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
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
      className={`bento-card col-span-2 row-span-1 relative overflow-hidden rounded-[24px] border border-border bg-surface p-5 ${className}`}
    >
      <div className="relative z-10 mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
            Stack
          </p>
          <h3 className="text-base font-semibold text-text-primary">Tech Stack</h3>
        </div>
        <span className="rounded-full border border-zinc-700/50 bg-zinc-800/60 px-2.5 py-1 text-[10px] font-medium text-zinc-300">
          {items.length} tools
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((tech, index) => (
          <div key={`${tech}-${index}`} className={BADGE_CLASS}>
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400" />
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
