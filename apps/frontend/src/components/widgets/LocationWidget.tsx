type LocationWidgetProps = {
  className?: string;
};

export default function LocationWidget({ className = "" }: LocationWidgetProps) {
  return (
    <div
      className={`bento-card col-span-1 row-span-1 bg-surface border border-border rounded-[24px] p-5 flex flex-col justify-center items-center text-center ${className}`}
    >
      <svg
        className="w-7 h-7 text-text-secondary mb-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-text-primary font-medium text-sm">Kyiv, UA</p>
      <p className="text-text-secondary text-xs mt-1 font-mono">14:30 PM</p>
    </div>
  );
}
