function DragHandleIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 8h16M4 16h16"
      />
    </svg>
  );
}

function ResizeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
      />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

type EditorOverlayProps = {
  size?: "large" | "small" | "resume";
  roundedClass?: string;
  onDelete?: () => void;
  onExpand?: () => void;
};

export function EditorOverlay({
  size = "large",
  roundedClass = "rounded-[32px]",
  onDelete,
  onExpand,
}: EditorOverlayProps) {
  if (size === "small") {
    return (
      <div
        className={`absolute inset-0 bg-background/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity z-50 flex items-center justify-center ${roundedClass}`}
      >
        <div className="flex flex-col gap-1 items-center">
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-surface-elevated text-text-primary cursor-grab"
            title="Drag"
          >
            <DragHandleIcon />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-red-500/20 text-text-primary hover:text-red-400"
            title="Delete"
            onClick={onDelete}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    );
  }

  if (size === "resume") {
    return (
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity z-50 flex items-center justify-center ${roundedClass}`}
      >
        <div className="flex flex-col gap-1 items-center">
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-black/20 text-white cursor-grab"
            title="Drag"
          >
            <DragHandleIcon />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-red-500/80 text-white"
            title="Delete"
            onClick={onDelete}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-0 bg-background/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity z-50 flex items-center justify-center ${roundedClass}`}
    >
      <div className="flex items-center gap-2 bg-surface border border-border p-1.5 rounded-full shadow-2xl">
        <button
          type="button"
          className="p-2 rounded-full hover:bg-surface-elevated text-text-primary cursor-grab"
          title="Drag"
        >
          <DragHandleIcon />
        </button>
        <div className="w-px h-5 bg-border" />
        <button
          type="button"
          className="p-2 rounded-full hover:bg-surface-elevated text-text-primary"
          title="Resize"
            onClick={onExpand}
        >
          <ResizeIcon />
        </button>
        <div className="w-px h-5 bg-border" />
        <button
          type="button"
          className="p-2 rounded-full hover:bg-red-500/20 text-text-primary hover:text-red-400"
          title="Delete"
            onClick={onDelete}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
