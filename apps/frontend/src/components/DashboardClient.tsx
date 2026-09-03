"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import BentoGrid, { ProfileData, WidgetData } from "@/components/BentoGrid";
import Sidebar from "@/components/Sidebar";
import SettingsPanel from "@/components/SettingsPanel";
import LogoutButton from "@/components/LogoutButton";
import CopyLinkButton from "@/components/CopyLinkButton";
import CropModal from "@/components/CropModal";
import ConfirmModal from "@/components/ConfirmModal";

type DashboardWidget = WidgetData & { id: string; position: number; config: unknown };
type DashboardProfile = ProfileData & { username: string; widgets: DashboardWidget[] };
type EditableProfile = Pick<ProfileData, "name" | "title" | "bio" | "linkedinUrl" | "githubUrl" | "resumeUrl">;
const MAX_WIDGETS = 6;

export default function DashboardClient({ profile }: { profile: DashboardProfile }) {
  const router = useRouter();
  const [profileState, setProfileState] = useState(profile);
  const [profileFields, setProfileFields] = useState<EditableProfile>(profile);
  const [sizes, setSizes] = useState<Record<string, string>>(() => Object.fromEntries(profile.widgets.map((widget) => [widget.type, widget.sizePreset || "M"])));
  const [widgets, setWidgets] = useState<DashboardWidget[]>(() => [...profile.widgets].sort((a, b) => a.position - b.position));
  const [selectedWidget, setSelectedWidget] = useState("profile");
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || "");
  const [cropImage, setCropImage] = useState("");
  const [city, setCity] = useState("Kyiv, UA");
  const [timezone, setTimezone] = useState("Europe/Kyiv");
  const [toast, setToast] = useState<"Saved" | "Failed to save" | "">("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const origin = useSyncExternalStore(() => () => undefined, () => window.location.origin, () => "");
  const publicLink = origin ? `${origin}/${profile.username}` : "";
  const activeWidget = widgets.find((widget) => widget.type === selectedWidget) || null;

  function updateWidget(id: string, newWidgetData: Partial<DashboardWidget>) {
    setWidgets((current) => current.map((widget) => widget.id === id || widget.type === id ? { ...widget, ...newWidgetData } : widget));
  }

  useEffect(() => {
    async function loadProfile() {
      const response = await fetch("/api/profile");
      if (!response.ok) return;
      const payload = await response.json();
      const loaded = payload.profile;
      if (!loaded) {
        router.push("/onboarding");
        return;
      }
      const loadedWidgets = [...(loaded.widgets || [])].sort((a, b) => a.position - b.position);
      setProfileState(loaded);
      setProfileFields(loaded);
      setWidgets(loadedWidgets);
      setSizes(Object.fromEntries(loadedWidgets.map((widget: DashboardWidget) => [widget.type, widget.sizePreset || "M"])));
      const location = loadedWidgets.find((widget: DashboardWidget) => widget.type === "location");
      const locationConfig = location?.config && typeof location.config === "object" ? location.config as Record<string, unknown> : {};
      setCity(String(locationConfig.city || "Kyiv, UA"));
      setTimezone(String(locationConfig.timezone || "Europe/Kyiv"));
      setAvatarUrl(loaded.avatarUrl || "");
    }
    loadProfile();
  }, [router]);

  function changeSize(size: string) {
    setSizes((current) => ({ ...current, [selectedWidget]: size }));
  }

  function removeWidget(id = selectedWidget) {
    setConfirmDelete(true);
    setSelectedWidget(id);
  }

  function confirmRemove() {
    const deletedId = activeWidget?.id || selectedWidget;
    setWidgets((current) => current.filter((widget) => widget.id !== deletedId && widget.type !== selectedWidget));
    setConfirmDelete(false);
    if (activeWidget?.id === deletedId || activeWidget?.type === selectedWidget) setSelectedWidget("");
  }

  function cycleWidgetSize(id: string) {
    const sizesInOrder = ["S", "M", "L", "Wide"];
    const current = sizes[id] || activeWidget?.sizePreset || "S";
    const next = sizesInOrder[(sizesInOrder.indexOf(current) + 1) % sizesInOrder.length];
    setSizes((value) => ({ ...value, [id]: next }));
    updateWidget(id, { sizePreset: next });
    setSelectedWidget(id);
  }

  function addWidget(name: string) {
    if (widgets.length >= MAX_WIDGETS) return;
    const id = name === "Profile Info" ? "profile" : name.toLowerCase().replace(" ", "-");
    if (!widgets.some((widget) => widget.type === id)) setWidgets((current) => [...current, { type: id, sizePreset: id === "profile" ? "L" : "M", config: {} } as DashboardWidget]);
  }

  function dragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setWidgets((current) => {
      const oldIndex = current.findIndex((widget) => widget.type === String(active.id));
      const newIndex = current.findIndex((widget) => widget.type === String(over.id));
      return oldIndex < 0 || newIndex < 0 ? current : arrayMove(current, oldIndex, newIndex);
    });
  }

  function save() {
    async function persist() {
      setIsSaving(true);
      try {
        const response = await fetch("/api/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...profileFields, avatarUrl, widgets: widgets.map((widget, position) => { const config = widget.config && typeof widget.config === "object" ? widget.config as Record<string, unknown> : {}; return { ...widget, sizePreset: sizes[widget.type] || widget.sizePreset, position, config: widget.type === "location" ? { ...config, city, timezone } : config }; }) }) });
        setToast(response.ok ? "Saved" : "Failed to save");
      } catch {
        setToast("Failed to save");
      } finally {
        setIsSaving(false);
        window.setTimeout(() => setToast(""), 2000);
      }
    }
    persist();
  }

  return (
    <div className="antialiased h-screen flex flex-col md:flex-row overflow-hidden bg-background">
      <Sidebar widgetCount={widgets.length} onAddWidget={addWidget} />
      <main className="flex-1 h-full canvas-bg flex flex-col relative">
        <div className="absolute left-8 right-8 top-5 z-10 flex items-center justify-between gap-4 border border-border bg-surface/90 px-4 py-2.5 backdrop-blur-md"><span className="truncate text-xs text-text-secondary">Your public link: {publicLink}</span><CopyLinkButton value={publicLink} /></div>
        <div className="flex-1 overflow-y-auto w-full p-8 pb-32 pt-24 flex justify-center"><BentoGrid editorMode isEditing profile={{ ...profileState, avatarUrl }} widgets={widgets.map((widget) => widget.type)} widgetData={widgets} widgetSizes={sizes} selectedWidget={selectedWidget} onSelectWidget={setSelectedWidget} onDragEnd={dragEnd} onDragStart={setSelectedWidget} onDeleteWidget={removeWidget} onResizeWidget={cycleWidgetSize} city={city} timezone={timezone} /></div>
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-surface/80 backdrop-blur-md border border-border p-2 rounded-2xl shadow-2xl z-50"><button type="button" onClick={() => window.open(`/${profile.username}`, "_blank")} className="px-5 py-2.5 rounded-xl border border-border text-primary text-sm font-medium hover:bg-surface-elevated">Preview</button><button type="button" onClick={save} disabled={isSaving} className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-200 disabled:opacity-60">{isSaving ? "Saving..." : "Save Changes"}</button></div>
        {toast && <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 border border-border bg-surface px-4 py-2 text-sm text-text-primary shadow-xl">{toast}</div>}
      </main>
      <SettingsPanel activeWidgetType={selectedWidget} activeWidget={activeWidget} updateWidget={updateWidget} selectedWidget={selectedWidget} selectedSize={sizes[selectedWidget] || "M"} onSizeChange={changeSize} onRemove={removeWidget} avatarUrl={avatarUrl} onAvatarChange={(url) => setCropImage(url)} profileFields={profileFields} onProfileChange={(field, value) => setProfileFields((current) => ({ ...current, [field]: value }))} city={city} timezone={timezone} onCityChange={setCity} onTimezoneChange={setTimezone} />
      <LogoutButton />
      <ConfirmModal isOpen={confirmDelete} title="Remove widget" message="Remove this widget?" onCancel={() => setConfirmDelete(false)} onConfirm={confirmRemove} />
      {cropImage && <CropModal image={cropImage} onCancel={() => setCropImage("")} onSave={(cropped) => { setAvatarUrl(cropped); setCropImage(""); }} />}
    </div>
  );
}
