"use client";

import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ProfileWidget from "@/components/widgets/ProfileWidget";
import SpotifyWidget from "@/components/widgets/SpotifyWidget";
import PortfolioWidget from "@/components/widgets/PortfolioWidget";
import LocationWidget from "@/components/widgets/LocationWidget";
import ResumeWidget from "@/components/widgets/ResumeWidget";
import AiChatWidget from "@/components/widgets/AiChatWidget";
import { EditorOverlay } from "@/components/editor/EditorOverlay";

export type ProfileData = {
  name?: string | null;
  title?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  resumeUrl?: string | null;
};

export type WidgetData = {
  id?: string;
  type: string;
  sizePreset?: string;
  config?: unknown;
  content?: unknown;
};

type WidgetView = { id?: string; type: string; config?: unknown; sizePreset?: string };

type BentoGridProps = {
  className?: string;
  editorMode?: boolean;
  profile?: ProfileData;
  widgetSizes?: Record<string, string>;
  removedWidgets?: string[];
  selectedWidget?: string;
  onSelectWidget?: (id: string) => void;
  widgets?: string[];
  onDragEnd?: (event: DragEndEvent) => void;
  onDragStart?: (id: string) => void;
  onDeleteWidget?: (id: string) => void;
  onResizeWidget?: (id: string) => void;
  city?: string;
  timezone?: string;
  isEditing?: boolean;
  widgetData?: WidgetView[];
};

const allWidgets = ["profile", "spotify", "portfolio", "location", "resume", "ai-chat"];
const sizeClasses: Record<string, string> = { S: "col-span-1 row-span-1", M: "col-span-2 row-span-1", L: "col-span-2 row-span-2", Wide: "col-span-3 row-span-1" };

export default function BentoGrid({ className = "", editorMode = false, profile, widgetSizes = {}, removedWidgets = [], selectedWidget, onSelectWidget, widgets = allWidgets, onDragEnd, onDragStart, onDeleteWidget, onResizeWidget, city, timezone, isEditing = editorMode, widgetData = [] }: BentoGridProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const orderedWidgets = widgets.filter((id) => !removedWidgets.includes(id));
  const grid = <div className={`w-full max-w-225 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-40 pb-25 ${className}`}>
    {orderedWidgets.map((id) => <SortableWidget key={id} id={id} editorMode={editorMode} selected={selectedWidget === id} sizeClass={sizeClasses[widgetSizes[id] || ""] || (id === "profile" ? "col-span-2 row-span-2" : id === "location" || id === "resume" ? "col-span-1 row-span-1" : "col-span-2 row-span-1")} onSelect={() => editorMode && onSelectWidget?.(id)} onDelete={() => onDeleteWidget?.(id)} onResize={() => onResizeWidget?.(id)}>
      {id === "profile" && <ProfileWidget profile={profile} isEditing={isEditing} className="h-full rounded-4xl !transform-none hover:!transform-none hover:!shadow-none" />}
      {id === "spotify" && <SpotifyWidget isEditing={isEditing} className="h-full rounded-3xl !transform-none hover:!transform-none hover:!shadow-none" />}
      {id === "portfolio" && <PortfolioWidget isEditing={isEditing} widget={{ content: getContent(widgetData, id) }} className="h-full rounded-3xl block !transform-none hover:!transform-none hover:!shadow-none" />}
      {id === "location" && <LocationWidget city={city} timezone={timezone} isEditing={isEditing} className="h-full rounded-3xl !transform-none hover:!transform-none hover:!shadow-none" />}
      {id === "resume" && <ResumeWidget resumeUrl={profile?.resumeUrl} isEditing={isEditing} widget={{ content: getContent(widgetData, id) }} className="h-full rounded-3xl !transform-none hover:!transform-none hover:!shadow-none" />}
      {id === "ai-chat" && <AiChatWidget isEditing={isEditing} className="h-full rounded-3xl !transform-none hover:!transform-none hover:!shadow-none" />}
    </SortableWidget>)}
  </div>;
  return editorMode ? <DndContext id="bento-editor" sensors={sensors} onDragStart={({ active }) => onDragStart?.(String(active.id))} onDragEnd={onDragEnd}><SortableContext items={orderedWidgets} strategy={rectSortingStrategy}>{grid}</SortableContext></DndContext> : grid;
}

function getContent(widgetData: WidgetView[], type: string) {
  const config = widgetData.find((widget) => widget.type === type)?.config;
  return config && typeof config === "object" ? config as { url?: string; resumeUrl?: string } : {};
}

function SortableWidget({ id, editorMode, selected, sizeClass, onSelect, onDelete, onResize, children }: { id: string; editorMode: boolean; selected: boolean; sizeClass: string; onSelect: () => void; onDelete: () => void; onResize: () => void; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} onClick={onSelect} className={`${sizeClass} relative overflow-hidden rounded-3xl group ${selected ? "ring-2 ring-white ring-offset-2 ring-offset-background" : ""} ${id === "profile" ? "rounded-4xl" : ""}`}>
    {editorMode && <EditorOverlay size={id === "location" || id === "resume" ? id === "resume" ? "resume" : "small" : "large"} roundedClass={id === "profile" ? "rounded-4xl" : "rounded-3xl"} onDelete={onDelete} onExpand={onResize} dragHandleProps={{ ...attributes, ...listeners }} />}
    {children}
  </div>;
}
