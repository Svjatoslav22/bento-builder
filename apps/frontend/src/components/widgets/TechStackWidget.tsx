type TechStackWidgetProps = {
  className?: string;
  isEditing?: boolean;
};

const TECHNOLOGIES = [
  { name: "React", color: "from-sky-500/30 to-cyan-600/10 border-sky-500/30 text-sky-300" },
  { name: "Next.js", color: "from-zinc-100/10 to-zinc-500/10 border-zinc-400/30 text-zinc-100" },
  { name: "Node.js", color: "from-emerald-500/25 to-green-700/10 border-emerald-500/30 text-emerald-300" },
  { name: "TypeScript", color: "from-blue-500/30 to-blue-700/10 border-blue-400/30 text-blue-300" },
  { name: "Tailwind", color: "from-teal-400/25 to-cyan-600/10 border-teal-400/30 text-teal-300" },
  { name: "PostgreSQL", color: "from-indigo-500/25 to-blue-800/10 border-indigo-400/30 text-indigo-300" },
];

export default function TechStackWidget({ className = "" }: TechStackWidgetProps) {
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
          Core tools
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {TECHNOLOGIES.map((tech) => (
          <div
            key={tech.name}
            className={`flex items-center gap-2 rounded-xl border bg-gradient-to-br px-3 py-2.5 text-xs font-medium ${tech.color}`}
          >
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current opacity-80" />
            {tech.name}
          </div>
        ))}
      </div>
    </div>
  );
}
