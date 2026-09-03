"use client";

import { useRef, useState } from "react";

type SettingsPanelProps = {
  selectedWidget: string;
  selectedSize: string;
  onSizeChange: (size: string) => void;
  onRemove: () => void;
  avatarUrl?: string | null;
  onAvatarChange: (url: string) => void;
};

const inputClass = "w-full rounded-lg border border-border bg-[#1A1A1D] px-3 py-2 text-sm text-text-primary outline-none focus:border-gray-500";

export default function SettingsPanel({ selectedWidget, selectedSize, onSizeChange, onRemove, avatarUrl, onAvatarChange }: SettingsPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const sizeLabel = selectedSize === "S" ? "1x1" : selectedSize === "M" ? "2x1" : selectedSize === "Wide" ? "3x1" : "2x2";

  return (
    <aside className="w-full md:w-[320px] h-full bg-surface border-l border-border flex flex-col flex-shrink-0 z-20">
      <div className="p-5 border-b border-border"><h2 className="text-sm font-semibold text-text-primary">Widget Settings</h2><p className="text-xs text-text-secondary mt-1">{selectedWidget} Component</p></div>
      <div className="p-5 flex-1 overflow-y-auto space-y-6">
        <div className="space-y-2"><label className="text-xs font-medium text-text-secondary">Avatar</label><div className="flex items-center gap-4"><div className="w-16 h-16 rounded-full border border-border bg-[#1A1A1D] overflow-hidden">{avatarUrl && <img src={avatarUrl} alt="Current avatar" className="w-full h-full object-cover" />}</div><input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; setFileName(file.name); onAvatarChange(URL.createObjectURL(file)); }} /><button type="button" onClick={() => inputRef.current?.click()} className={`${inputClass} w-auto`}>↑ Upload new</button></div>{fileName && <p className="truncate text-xs text-text-secondary">{fileName}</p>}</div>
        <div className="space-y-4"><label className="block text-xs font-medium text-text-secondary">Name<input className={`${inputClass} mt-1.5`} placeholder="Your full name" /></label><label className="block text-xs font-medium text-text-secondary">Title / Role<input className={`${inputClass} mt-1.5`} placeholder="e.g. Full-Stack Developer" /></label><label className="block text-xs font-medium text-text-secondary">Bio<textarea rows={3} className={`${inputClass} mt-1.5 resize-none`} placeholder="Tell people what you build..." /></label></div>
        <hr className="border-border" />
        <div className="space-y-2"><label className="flex items-center justify-between text-xs font-medium text-text-secondary">Size<span className="rounded bg-surface-elevated px-1.5 py-0.5">{sizeLabel}</span></label><div className="flex gap-1 rounded-xl border border-border bg-[#1A1A1D] p-1">{["S", "M", "L", "Wide"].map((size) => <button key={size} type="button" onClick={() => onSizeChange(size)} className={`flex-1 rounded-lg py-1.5 text-xs font-medium ${selectedSize === size ? "bg-white text-black" : "text-text-secondary hover:text-white"}`}>{size}</button>)}</div></div>
        <hr className="border-border" />
        <div className="space-y-3"><label className="text-xs font-medium text-text-secondary">Social Links</label><input className={inputClass} placeholder="https://linkedin.com/in/yourname" /><input className={inputClass} placeholder="https://github.com/yourname" /></div>
        <button type="button" onClick={onRemove} className="w-full rounded-lg border border-red-500/20 bg-red-500/5 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10">Remove Widget</button>
      </div>
    </aside>
  );
}
