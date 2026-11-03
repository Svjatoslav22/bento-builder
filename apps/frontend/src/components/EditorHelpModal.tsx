"use client";

import { useEffect } from "react";

type EditorHelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const steps = [
  { title: "This is your public profile", text: "What you build here becomes your public portfolio page." },
  { title: "Add and arrange widgets", text: "Pick widgets in the left sidebar (up to 6). Hover or click a widget on the grid to drag it, resize it or delete it. Use the right panel to configure the selected widget." },
  { title: "Publish with Save Changes", text: "Changes are not published automatically. Click Save Changes at the bottom to update your public page." },
  { title: "Preview and share", text: "Preview opens your public page in a new tab. Copy your public link from the bar at the top." },
];

export default function EditorHelpModal({ isOpen, onClose }: EditorHelpModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="editor-help-title" onClick={(event) => event.stopPropagation()} className="max-h-full w-full max-w-md overflow-y-auto rounded-xl border border-border bg-surface p-6 shadow-2xl">
        <h2 id="editor-help-title" className="text-base font-semibold text-text-primary">How it works</h2>
        <ol className="mt-4 space-y-4">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-xs font-medium text-text-primary">{index + 1}</span>
              <div>
                <p className="text-sm font-medium text-text-primary">{step.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex justify-end">
          <button type="button" autoFocus onClick={onClose} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200">Got it</button>
        </div>
      </div>
    </div>
  );
}

