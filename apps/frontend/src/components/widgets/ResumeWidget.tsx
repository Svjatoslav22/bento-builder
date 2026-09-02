type ResumeWidgetProps = {
  className?: string;
  resumeUrl?: string | null;
};

export default function ResumeWidget({ className = "", resumeUrl }: ResumeWidgetProps) {
  return (
    <a
      href={resumeUrl || undefined}
      download={Boolean(resumeUrl)}
      className={`bento-card col-span-1 row-span-1 bg-white text-black rounded-[24px] p-5 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-gray-100 transition-colors ${className}`}
    >
      <svg
        className="w-7 h-7 mb-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <p className="font-semibold text-sm">Resume</p>
      <p className="text-black/60 text-xs mt-1">PDF, 1.2MB</p>
    </a>
  );
}
