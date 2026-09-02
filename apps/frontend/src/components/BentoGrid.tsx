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

export default function BentoGrid({ className = "", editorMode = false, profile }: BentoGridProps) {
  const widgetClass = "!border-0 !transform-none hover:!transform-none hover:!shadow-none h-full";

  return (
    <div className={`w-full max-w-225 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-40 ${className}`}>
      <div className={`col-span-2 row-span-2 relative overflow-hidden rounded-4xl group ${editorMode ? "ring-2 ring-white ring-offset-2 ring-offset-background" : ""}`}>
        {editorMode && <EditorOverlay roundedClass="rounded-4xl" />}
        <ProfileWidget profile={profile} className={`${editorMode ? widgetClass : ""} h-full rounded-4xl`} />
      </div>
      <div className="col-span-2 row-span-1 relative overflow-hidden rounded-3xl group">
        {editorMode && <EditorOverlay roundedClass="rounded-3xl" />}
        <SpotifyWidget className={`${editorMode ? widgetClass : ""} h-full rounded-3xl`} />
      </div>
      <div className="col-span-2 row-span-1 relative overflow-hidden rounded-3xl group">
        {editorMode && <EditorOverlay roundedClass="rounded-3xl" />}
        <PortfolioWidget className={`${editorMode ? widgetClass : ""} h-full rounded-3xl block`} />
      </div>
      <div className="col-span-1 row-span-1 relative overflow-hidden rounded-3xl group">
        {editorMode && <EditorOverlay size="small" roundedClass="rounded-3xl" />}
        <LocationWidget className={`${editorMode ? widgetClass : ""} h-full rounded-3xl`} />
      </div>
      <div className="col-span-1 row-span-1 relative overflow-hidden rounded-3xl bg-white group">
        {editorMode && <EditorOverlay size="resume" roundedClass="rounded-3xl" />}
        <ResumeWidget resumeUrl={profile?.resumeUrl} className={`${editorMode ? widgetClass : ""} h-full rounded-3xl`} />
      </div>
      <div className="col-span-2 row-span-1 relative overflow-hidden rounded-3xl group">
        {editorMode && <EditorOverlay roundedClass="rounded-3xl" />}
        <AiChatWidget className={`${editorMode ? widgetClass : ""} h-full rounded-3xl`} />
      </div>
    </div>
  );
}