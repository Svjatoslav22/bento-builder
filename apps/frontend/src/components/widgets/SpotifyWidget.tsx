type SpotifyWidgetProps = {
  className?: string;
  isEditing?: boolean;
};

export default function SpotifyWidget({ className = "" }: SpotifyWidgetProps) {
  return (
    <div
      className={`bento-card col-span-2 row-span-1 bg-surface border border-border rounded-[24px] p-6 flex items-center gap-5 relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[40px] rounded-full" />

      <div className="w-16 h-16 bg-[#1DB954] rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg">
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.241 1.2zM20.16 9.6C15.84 7.08 9.12 6.96 5.28 8.16c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.56-1.32 12-1.2 16.92 1.68.54.3 0.72 1.02.42 1.56-.3.54-1.02.72-1.56.42z" />
        </svg>
      </div>

      <div className="flex-1 min-w-0 z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="flex gap-1 h-3 items-end">
            <span className="w-1 bg-[#1DB954] h-full animate-[pulse_1s_ease-in-out_infinite]" />
            <span className="w-1 bg-[#1DB954] h-2/3 animate-[pulse_1.2s_ease-in-out_infinite]" />
            <span className="w-1 bg-[#1DB954] h-full animate-[pulse_0.8s_ease-in-out_infinite]" />
          </span>
          <p className="text-xs text-[#1DB954] font-medium tracking-wide uppercase">
            Now Playing
          </p>
        </div>
        <h3 className="text-text-primary font-semibold text-base truncate">
          Starboy
        </h3>
        <p className="text-text-secondary text-sm truncate">
          The Weeknd, Daft Punk
        </p>
      </div>
    </div>
  );
}
