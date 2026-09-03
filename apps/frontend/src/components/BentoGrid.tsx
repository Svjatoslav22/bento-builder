"use client";

import ProfileWidget from "@/components/widgets/ProfileWidget";
import SpotifyWidget from "@/components/widgets/SpotifyWidget";
import PortfolioWidget from "@/components/widgets/PortfolioWidget";
import LocationWidget from "@/components/widgets/LocationWidget";
import ResumeWidget from "@/components/widgets/ResumeWidget";
import AiChatWidget from "@/components/widgets/AiChatWidget";
import { EditorOverlay } from "@/components/editor/EditorOverlay";

type BentoGridProps = {
  className?: string;
  editorMode?: boolean;
  profile?: ProfileData;
  widgetSizes?: Record<string, string>;
  removedWidgets?: string[];
  selectedWidget?: string;
  onSelectWidget?: (id: string) => void;
};

export type ProfileData = {
  name?: string | null;
  title?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  resumeUrl?: string | null;
};

export default function BentoGrid({ className = "", editorMode = false, profile, widgetSizes = {}, removedWidgets = [], selectedWidget, onSelectWidget }: BentoGridProps) {
  const widgetClass = "!border-0 !transform-none hover:!transform-none hover:!shadow-none h-full";
  const sizeClasses: Record<string, string> = { S: "col-span-1 row-span-1", M: "col-span-2 row-span-1", L: "col-span-2 row-span-2", Wide: "col-span-3 row-span-1" };
  const cellClass = (id: string, fallback: string) => `${sizeClasses[widgetSizes[id] || ""] || fallback} relative overflow-hidden rounded-3xl group ${editorMode && selectedWidget === id ? "ring-2 ring-white ring-offset-2 ring-offset-background" : ""}`;
  const select = (id: string) => editorMode && onSelectWidget?.(id);

  return (
    <div className={`w-full max-w-225 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-40 ${className}`}>
      {!removedWidgets.includes("profile") && <div onClick={() => select("profile")} className={`${cellClass("profile", "col-span-2 row-span-2")} rounded-4xl`}>
        {editorMode && <EditorOverlay roundedClass="rounded-4xl" />}
        <ProfileWidget profile={profile} className={`${editorMode ? widgetClass : ""} h-full rounded-4xl`} />
      </div>}
      {!removedWidgets.includes("spotify") && <div onClick={() => select("spotify")} className={cellClass("spotify", "col-span-2 row-span-1")}>
        {editorMode && <EditorOverlay roundedClass="rounded-3xl" />}
        <SpotifyWidget className={`${editorMode ? widgetClass : ""} h-full rounded-3xl`} />
      </div>}
      {!removedWidgets.includes("portfolio") && <div onClick={() => select("portfolio")} className={cellClass("portfolio", "col-span-2 row-span-1")}>
        {editorMode && <EditorOverlay roundedClass="rounded-3xl" />}
        <PortfolioWidget className={`${editorMode ? widgetClass : ""} h-full rounded-3xl block`} />
      </div>}
      {!removedWidgets.includes("location") && <div onClick={() => select("location")} className={cellClass("location", "col-span-1 row-span-1")}>
        {editorMode && <EditorOverlay size="small" roundedClass="rounded-3xl" />}
        <LocationWidget className={`${editorMode ? widgetClass : ""} h-full rounded-3xl`} />
      </div>}
      {!removedWidgets.includes("resume") && <div onClick={() => select("resume")} className={`${cellClass("resume", "col-span-1 row-span-1")} bg-white`}>
        {editorMode && <EditorOverlay size="resume" roundedClass="rounded-3xl" />}
        <ResumeWidget resumeUrl={profile?.resumeUrl} className={`${editorMode ? widgetClass : ""} h-full rounded-3xl`} />
      </div>}
      {!removedWidgets.includes("ai-chat") && <div onClick={() => select("ai-chat")} className={cellClass("ai-chat", "col-span-2 row-span-1")}>
        {editorMode && <EditorOverlay roundedClass="rounded-3xl" />}
        <AiChatWidget className={`${editorMode ? widgetClass : ""} h-full rounded-3xl`} />
      </div>}
    </div>
  );
}