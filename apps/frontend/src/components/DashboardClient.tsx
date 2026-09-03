"use client";

import { useState } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import BentoGrid, { ProfileData } from "@/components/BentoGrid";
import Sidebar from "@/components/Sidebar";
import SettingsPanel from "@/components/SettingsPanel";
import LogoutButton from "@/components/LogoutButton";
import CopyLinkButton from "@/components/CopyLinkButton";
import CropModal from "@/components/CropModal";

type DashboardProfile = ProfileData & { username: string };

const initialSizes = { profile: "L", spotify: "M", portfolio: "M", location: "S", resume: "S", "ai-chat": "M" };
const initialWidgets = ["profile", "spotify", "portfolio", "location", "resume", "ai-chat"];

export default function DashboardClient({ profile }: { profile: DashboardProfile }) {
  const [sizes, setSizes] = useState<Record<string, string>>(initialSizes);
  const [widgets, setWidgets] = useState(initialWidgets);
  const [removedWidgets, setRemovedWidgets] = useState<string[]>([]);
  const [selectedWidget, setSelectedWidget] = useState("profile");
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || "");
  const [cropImage, setCropImage] = useState("");
  const [city, setCity] = useState("Kyiv, UA");
  const [timezone, setTimezone] = useState("Europe/Kyiv");
  const [toast, setToast] = useState(false);
  const publicUrl = `https://bento-builder.vercel.app/${profile.username}`;

  function changeSize(size: string) {
    setSizes((current) => ({ ...current, [selectedWidget]: size }));
  }

  function removeWidget(id = selectedWidget) {
    if (!window.confirm("Remove this widget?")) return;
    setRemovedWidgets((current) => [...current, id]);
    setSelectedWidget("profile");
  }

  function addWidget(name: string) {
    if (widgets.length >= 6) return;
    const id = name === "Profile Info" ? "profile" : name.toLowerCase().replace(" ", "-");
    if (!widgets.includes(id)) setWidgets((current) => [...current, id]);
  }

  function dragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setWidgets((current) => arrayMove(current, current.indexOf(String(active.id)), current.indexOf(String(over.id))));
  }

  function save() {
    console.log("saving", { sizes, removedWidgets });
    setToast(true);
    window.setTimeout(() => setToast(false), 2000);
  }

  return (
    <div className="antialiased h-screen flex flex-col md:flex-row overflow-hidden bg-background">
      <Sidebar widgetCount={widgets.length} onAddWidget={addWidget} />
      <main className="flex-1 h-full canvas-bg flex flex-col relative">
        <div className="absolute left-8 right-8 top-5 z-10 flex items-center justify-between gap-4 border border-border bg-surface/90 px-4 py-2.5 backdrop-blur-md"><span className="truncate text-xs text-text-secondary">Your public link: {publicUrl.replace("https://", "")}</span><CopyLinkButton value={publicUrl} /></div>
        <div className="flex-1 overflow-y-auto w-full p-8 pb-32 pt-24 flex justify-center"><BentoGrid editorMode profile={{ ...profile, avatarUrl }} widgets={widgets} widgetSizes={sizes} removedWidgets={removedWidgets} selectedWidget={selectedWidget} onSelectWidget={setSelectedWidget} onDragEnd={dragEnd} onDragStart={setSelectedWidget} onDeleteWidget={removeWidget} city={city} timezone={timezone} /></div>
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-surface/80 backdrop-blur-md border border-border p-2 rounded-2xl shadow-2xl z-50"><button type="button" onClick={() => window.open(`/${profile.username}`, "_blank")} className="px-5 py-2.5 rounded-xl border border-border text-text-primary text-sm font-medium hover:bg-surface-elevated">Preview</button><button type="button" onClick={save} className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-200">Save Changes</button></div>
        {toast && <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 border border-border bg-surface px-4 py-2 text-sm text-text-primary shadow-xl">Changes saved</div>}
      </main>
      <SettingsPanel selectedWidget={selectedWidget} selectedSize={sizes[selectedWidget] || "M"} onSizeChange={changeSize} onRemove={removeWidget} avatarUrl={avatarUrl} onAvatarChange={(url) => setCropImage(url)} city={city} timezone={timezone} onCityChange={setCity} onTimezoneChange={setTimezone} />
      <LogoutButton />
      {cropImage && <CropModal image={cropImage} onCancel={() => setCropImage("")} onSave={(cropped) => { setAvatarUrl(cropped); setCropImage(""); }} />}
    </div>
  );
}
