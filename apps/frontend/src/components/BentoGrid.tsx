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
    <div className={`w-full max-w-[900px] grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] ${className}`}>
      <div className={`col-span-2 row-span-2 relative overflow-hidden rounded-[32px] group ${editorMode ? "ring-2 ring-white ring-offset-2 ring-offset-background" : ""}`}>
        {editorMode && <EditorOverlay roundedClass="rounded-[32px]" />}
        <ProfileWidget profile={profile} className={`${editorMode ? widgetClass : ""} h-full rounded-[32px]`} />
      </div>
      <div className="col-span-2 row-span-1 relative overflow-hidden rounded-[24px] group">
        {editorMode && <EditorOverlay roundedClass="rounded-[24px]" />}
        <SpotifyWidget className={`${editorMode ? widgetClass : ""} h-full rounded-[24px]`} />
      </div>
      <div className="col-span-2 row-span-1 relative overflow-hidden rounded-[24px] group">
        {editorMode && <EditorOverlay roundedClass="rounded-[24px]" />}
        <PortfolioWidget className={`${editorMode ? widgetClass : ""} h-full rounded-[24px] block`} />
      </div>
      <div className="col-span-1 row-span-1 relative overflow-hidden rounded-[24px] group">
        {editorMode && <EditorOverlay size="small" roundedClass="rounded-[24px]" />}
        <LocationWidget className={`${editorMode ? widgetClass : ""} h-full rounded-[24px]`} />
      </div>
      <div className="col-span-1 row-span-1 relative overflow-hidden rounded-[24px] bg-white group">
        {editorMode && <EditorOverlay size="resume" roundedClass="rounded-[24px]" />}
        <ResumeWidget resumeUrl={profile?.resumeUrl} className={`${editorMode ? widgetClass : ""} h-full rounded-[24px]`} />
      </div>
      <div className="col-span-2 row-span-1 relative overflow-hidden rounded-[24px] group">
        {editorMode && <EditorOverlay roundedClass="rounded-[24px]" />}
        <AiChatWidget className={`${editorMode ? widgetClass : ""} h-full rounded-[24px]`} />
      </div>
    </div>
  );
}