type BentoLogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export default function BentoLogo({ className = "", showWordmark = true }: BentoLogoProps) {
  if (!showWordmark) {
    return (
      <svg
        viewBox="0 0 42 48"
        className={`h-7 w-auto flex-shrink-0 ${className}`}
        aria-label="Bento Builder"
      >
        <rect x="0" y="0" width="19" height="48" rx="6" fill="#DCDFE6" />
        <rect x="23" y="0" width="19" height="23" rx="6" fill="#FFFFFF" />
        <rect x="23" y="25" width="19" height="23" rx="6" fill="#6D5BFF" />
      </svg>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <svg
        viewBox="0 0 250 48"
        className="h-7 w-auto"
        aria-label="Bento Builder"
      >
        <rect x="0" y="0" width="19" height="48" rx="6" fill="#DCDFE6" />
        <rect x="23" y="0" width="19" height="23" rx="6" fill="#FFFFFF" />
        <rect x="23" y="25" width="19" height="23" rx="6" fill="#6D5BFF" />
        <text
          x="56"
          y="34"
          fontFamily="Inter, Geist, system-ui, -apple-system, sans-serif"
          fontSize="28"
          fontWeight="700"
          letterSpacing="-0.5"
          fill="#FFFFFF"
        >
          Bento Builder
        </text>
      </svg>
    </div>
  );
}
