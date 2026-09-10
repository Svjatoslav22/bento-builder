type BentoLogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export default function BentoLogo({ className = "", showWordmark = true }: BentoLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8 flex-shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bentoTile" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#0e7490" />
          </linearGradient>
          <linearGradient id="bentoBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a5f3fc" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="10"
          fill="none"
          stroke="url(#bentoBorder)"
          strokeWidth="2.5"
          strokeDasharray="28 6"
          strokeLinecap="round"
        />
        <rect x="9" y="9" width="14" height="14" rx="3.5" fill="url(#bentoTile)" opacity="0.95" />
        <rect x="25" y="9" width="14" height="8" rx="3" fill="#67e8f9" opacity="0.75" />
        <rect x="25" y="19" width="8" height="8" rx="2.5" fill="#fb923c" />
        <rect x="9" y="25" width="8" height="14" rx="3" fill="#22d3ee" opacity="0.7" />
        <rect x="19" y="25" width="20" height="14" rx="3.5" fill="#0e7490" opacity="0.85" />
      </svg>

      {showWordmark && (
        <span className="text-sm font-semibold tracking-[0.12em] text-text-primary">
          BENT
          <span className="relative inline-block px-[0.05em]">
            O
            <span className="absolute left-1/2 top-1/2 h-[0.22em] w-[0.22em] -translate-x-1/2 -translate-y-1/2 rounded-[1px] bg-white" />
            <span className="absolute -right-[0.05em] top-[0.12em] h-[0.18em] w-[0.18em] bg-cyan-300" />
          </span>
          {" "}BUILDER
        </span>
      )}
    </div>
  );
}
