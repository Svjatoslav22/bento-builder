type AiChatWidgetProps = {
  className?: string;
};

export default function AiChatWidget({ className = "" }: AiChatWidgetProps) {
  return (
    <div
      className={`bento-card col-span-2 row-span-1 bg-surface border border-border rounded-[24px] p-4 flex flex-col justify-between ${className}`}
    >
      <div className="flex-1 overflow-hidden px-2 pt-1">
        <div className="flex gap-3 items-start opacity-70">
          <div className="w-6 h-6 rounded-full bg-border flex-shrink-0 flex items-center justify-center text-[10px]">
            AI
          </div>
          <p className="text-sm text-text-secondary font-mono">
            Hi! I&apos;m Alex&apos;s AI clone. Ask me about his tech stack or
            recent projects.
          </p>
        </div>
      </div>

      <div className="mt-3 relative">
        <input
          type="text"
          placeholder="Ask my AI anything..."
          className="w-full bg-[#1A1A1D] border border-border rounded-xl py-3 px-4 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-gray-500 transition-colors font-mono"
          disabled
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-lg hover:bg-gray-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
