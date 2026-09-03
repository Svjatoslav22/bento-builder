"use client";

import { useEffect, useRef, useState } from "react";

type SettingsPanelProps = {
  selectedWidget: string;
  activeWidgetType?: string;
  selectedSize: string;
  onSizeChange: (size: string) => void;
  onRemove: () => void;
  avatarUrl?: string | null;
  onAvatarChange: (url: string) => void;
  city: string;
  timezone: string;
  onCityChange: (value: string) => void;
  onTimezoneChange: (value: string) => void;
  profileFields: { name?: string | null; title?: string | null; bio?: string | null; linkedinUrl?: string | null; githubUrl?: string | null };
  onProfileChange: (field: "name" | "title" | "bio" | "linkedinUrl" | "githubUrl", value: string) => void;
  activeWidget: { id: string; type: string; sizePreset?: string; config?: unknown } | null;
  updateWidget: (id: string, newWidgetData: { config?: unknown; sizePreset?: string }) => void;
  isUploading: boolean;
  onResumeUpload: (file: File) => void;
};

const inputClass = "w-full rounded-lg border border-border bg-[#1A1A1D] px-3 py-2 text-sm text-text-primary outline-none focus:border-gray-500";

export default function SettingsPanel({ selectedWidget, activeWidgetType: activeWidgetTypeProp, selectedSize, onSizeChange, onRemove, avatarUrl, onAvatarChange, city, timezone, onCityChange, onTimezoneChange, profileFields, onProfileChange, activeWidget, updateWidget, isUploading, onResumeUpload }: SettingsPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const sizeLabel = selectedSize === "S" ? "1x1" : selectedSize === "M" ? "2x1" : selectedSize === "Wide" ? "3x1" : "2x2";
  const panelRef = useRef<HTMLElement>(null);
  const activeWidgetType = activeWidgetTypeProp || selectedWidget;
  const safeWidgetType = typeof activeWidgetType === "string" ? activeWidgetType : "profile";
  const activeWidgetLabel = safeWidgetType === "ai-chat" ? "AI Chat" : safeWidgetType.charAt(0).toUpperCase() + safeWidgetType.slice(1);
  const widgetContent = activeWidget?.config && typeof activeWidget.config === "object" ? activeWidget.config as Record<string, unknown> : {};
  const updateContent = (field: string, value: string) => updateWidget(activeWidget?.id || selectedWidget, { config: { ...widgetContent, [field]: value } });
  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedWidget]);

  return (
    <aside ref={panelRef} className="w-full md:w-[320px] h-full bg-surface border-l border-border flex flex-col flex-shrink-0 z-20">
      <div className="p-5 border-b border-border"><h2 className="text-sm font-semibold text-text-primary">Widget Settings</h2><p className="text-xs text-text-secondary mt-1">{activeWidgetLabel} Component</p></div>
      <div className="p-5 flex-1 overflow-y-auto space-y-6">
        {safeWidgetType === "profile" && <><div className="space-y-2"><label className="text-xs font-medium text-text-secondary">Avatar</label><div className="flex items-center gap-4"><div className="w-16 h-16 rounded-full border border-border bg-[#1A1A1D] overflow-hidden">{avatarUrl && <img src={avatarUrl} alt="Current avatar" className="w-full h-full object-cover" />}</div><input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; setFileName(file.name); onAvatarChange(URL.createObjectURL(file)); }} /><button type="button" onClick={() => inputRef.current?.click()} className={`${inputClass} w-auto`}>↑ Upload new</button></div>{fileName && <p className="truncate text-xs text-text-secondary">{fileName}</p>}</div><div className="space-y-4"><label className="block text-xs font-medium text-text-secondary">Name<input value={profileFields.name || ""} onChange={(event) => onProfileChange("name", event.target.value)} className={`${inputClass} mt-1.5`} placeholder="Your full name" /></label><label className="block text-xs font-medium text-text-secondary">Title / Role<input value={profileFields.title || ""} onChange={(event) => onProfileChange("title", event.target.value)} className={`${inputClass} mt-1.5`} placeholder="e.g. Full-Stack Developer" /></label><label className="block text-xs font-medium text-text-secondary">Bio<textarea value={profileFields.bio || ""} onChange={(event) => onProfileChange("bio", event.target.value)} rows={3} className={`${inputClass} mt-1.5 resize-none`} placeholder="Tell people what you build..." /></label></div></>}
        {safeWidgetType === "portfolio" && <label className="block text-xs font-medium text-text-secondary">Portfolio URL<input value={String(widgetContent.url || "")} onChange={(event) => updateContent("url", event.target.value)} className={`${inputClass} mt-1.5`} type="url" placeholder="https://yourportfolio.com" /></label>}
        {safeWidgetType === "resume" && <div className="space-y-2"><label className="text-xs font-medium text-text-secondary">Resume PDF</label><input type="file" accept="application/pdf" className="hidden" id="resume-upload" onChange={(event) => { const file = event.target.files?.[0]; if (file) onResumeUpload(file); }} /><label htmlFor="resume-upload" className={`${inputClass} block cursor-pointer text-center`}>{isUploading ? "Uploading..." : "Choose PDF file"}</label>{typeof widgetContent.filename === "string" && <p className="truncate text-xs text-text-secondary">{widgetContent.filename}</p>}</div>}
        {safeWidgetType === "ai-chat" && <label className="block text-xs font-medium text-text-secondary">Контекст для AI (Розкажи про себе для HR)<textarea value={String(widgetContent.context || "")} onChange={(event) => updateContent("context", event.target.value)} rows={6} className={`${inputClass} mt-1.5 resize-none`} placeholder="Розкажи про свій досвід, навички та проєкти..." /></label>}
        {safeWidgetType === "spotify" && <button type="button" className="w-full rounded-lg bg-[#1DB954] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1aa34a]">Connect Spotify</button>}
        <hr className="border-border" />
        <div className="space-y-2"><label className="flex items-center justify-between text-xs font-medium text-text-secondary">Size<span className="rounded bg-surface-elevated px-1.5 py-0.5">{sizeLabel}</span></label><div className="flex gap-1 rounded-xl border border-border bg-[#1A1A1D] p-1">{["S", "M", "L", "Wide"].map((size) => <button key={size} type="button" onClick={() => onSizeChange(size)} className={`flex-1 rounded-lg py-1.5 text-xs font-medium ${selectedSize === size ? "bg-white text-black" : "text-text-secondary hover:text-white"}`}>{size}</button>)}</div></div>
        <hr className="border-border" />
        {safeWidgetType === "location" && <div className="space-y-3"><label className="block text-xs font-medium text-text-secondary">City / Label<input value={city} onChange={(event) => onCityChange(event.target.value)} className={`${inputClass} mt-1.5`} /></label><label className="block text-xs font-medium text-text-secondary">Timezone<select value={timezone} onChange={(event) => onTimezoneChange(event.target.value)} className={`${inputClass} mt-1.5`}><option>Europe/Kyiv</option><option>Europe/London</option><option>Europe/Warsaw</option><option>America/New_York</option><option>America/Los_Angeles</option><option>Asia/Dubai</option><option>Asia/Tokyo</option></select></label></div>}
        {safeWidgetType === "profile" && <div className="space-y-3"><label className="text-xs font-medium text-text-secondary">Social Links</label><input value={profileFields.linkedinUrl || ""} onChange={(event) => onProfileChange("linkedinUrl", event.target.value)} className={inputClass} placeholder="https://linkedin.com/in/yourname" /><input value={profileFields.githubUrl || ""} onChange={(event) => onProfileChange("githubUrl", event.target.value)} className={inputClass} placeholder="https://github.com/yourname" /></div>}
        <button type="button" onClick={onRemove} className="w-full rounded-lg border border-red-500/20 bg-red-500/5 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10">Remove Widget</button>
      </div>
    </aside>
  );
}
