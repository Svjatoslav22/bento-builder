export default function SettingsPanel() {
  return (
    <aside className="w-full md:w-[320px] h-full bg-surface border-l border-border flex flex-col flex-shrink-0 z-20">
      <div className="p-5 border-b border-border">
        <h2 className="text-sm font-semibold text-text-primary tracking-wide">
          Widget Settings
        </h2>
        <p className="text-xs text-text-secondary mt-1">Profile Info Component</p>
      </div>

      <div className="p-5 flex-1 overflow-y-auto space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-text-secondary">Avatar</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-border bg-[#1A1A1D] flex items-center justify-center text-text-secondary overflow-hidden relative group cursor-pointer hover:border-gray-500 transition-colors">
              <img
                src="https://ui-avatars.com/api/?name=Alex+Dev&background=random&size=128"
                alt="Current Avatar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
            <button
              type="button"
              className="text-sm text-text-primary bg-surface-elevated border border-border px-3 py-1.5 rounded-lg hover:border-gray-500 transition-colors"
            >
              Upload new
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-text-secondary">Name</label>
            <input
              type="text"
              defaultValue="Alex Designer"
              className="w-full bg-[#1A1A1D] border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-text-secondary">
              Title / Role
            </label>
            <input
              type="text"
              defaultValue="Senior UI/UX & Frontend Developer"
              className="w-full bg-[#1A1A1D] border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-text-secondary">Bio</label>
            <textarea
              rows={3}
              defaultValue="Crafting pixel-perfect SaaS interfaces and obsessing over grid systems. Currently building cool stuff."
              className="w-full bg-[#1A1A1D] border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all resize-none"
            />
          </div>
        </div>

        <hr className="border-border" />

        <div className="space-y-2">
          <label className="text-xs font-medium text-text-secondary flex justify-between items-center">
            Size
            <span className="text-[10px] bg-surface-elevated px-1.5 py-0.5 rounded text-text-secondary">
              2x2
            </span>
          </label>
          <div className="flex p-1 bg-[#1A1A1D] rounded-xl border border-border gap-1">
            <button
              type="button"
              className="flex-1 py-1.5 text-xs font-medium text-text-secondary hover:text-white rounded-lg transition-colors"
            >
              S
            </button>
            <button
              type="button"
              className="flex-1 py-1.5 text-xs font-medium text-text-secondary hover:text-white rounded-lg transition-colors"
            >
              M
            </button>
            <button
              type="button"
              className="flex-1 py-1.5 text-xs font-medium bg-surface border border-border shadow-sm text-text-primary rounded-lg transition-colors"
            >
              L
            </button>
            <button
              type="button"
              className="flex-1 py-1.5 text-xs font-medium text-text-secondary hover:text-white rounded-lg transition-colors"
            >
              Wide
            </button>
          </div>
        </div>

        <hr className="border-border" />

        <div className="space-y-3">
          <label className="text-xs font-medium text-text-secondary">
            Social Links
          </label>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-text-secondary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <input
              type="text"
              defaultValue="linkedin.com/in/alexdev"
              className="w-full bg-[#1A1A1D] border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-text-secondary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <input
              type="text"
              defaultValue="github.com/alexdev"
              className="w-full bg-[#1A1A1D] border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
            />
          </div>
        </div>

        <div className="pt-2 pb-6">
          <button
            type="button"
            className="w-full py-2.5 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-medium hover:bg-red-500/10 hover:border-red-500/30 transition-colors"
          >
            Remove Widget
          </button>
        </div>
      </div>
    </aside>
  );
}
