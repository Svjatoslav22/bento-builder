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

const TECH_COLORS = [
  "from-sky-500/30 to-cyan-600/10 border-sky-500/30 text-sky-300",
  "from-zinc-100/10 to-zinc-500/10 border-zinc-400/30 text-zinc-100",
  "from-emerald-500/25 to-green-700/10 border-emerald-500/30 text-emerald-300",
  "from-blue-500/30 to-blue-700/10 border-blue-400/30 text-blue-300",
  "from-teal-400/25 to-cyan-600/10 border-teal-400/30 text-teal-300",
  "from-indigo-500/25 to-blue-800/10 border-indigo-400/30 text-indigo-300",
  "from-orange-500/25 to-amber-700/10 border-orange-400/30 text-orange-300",
  "from-violet-500/25 to-purple-800/10 border-violet-400/30 text-violet-300",
];

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
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -bottom-10 left-10 h-24 w-24 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative z-10 mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-cyan-400/80">
            Stack
          </p>
          <h3 className="text-base font-semibold text-text-primary">Tech Stack</h3>
        </div>
        <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[10px] font-medium text-orange-300">
          {items.length} tools
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((tech, index) => (
          <div
            key={`${tech}-${index}`}
            className={`flex items-center gap-2 rounded-xl border bg-gradient-to-br px-3 py-2.5 text-xs font-medium ${TECH_COLORS[index % TECH_COLORS.length]}`}
          >
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current opacity-80" />
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
