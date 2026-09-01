import ProfileWidget from "@/components/widgets/ProfileWidget";
import SpotifyWidget from "@/components/widgets/SpotifyWidget";
import PortfolioWidget from "@/components/widgets/PortfolioWidget";
import LocationWidget from "@/components/widgets/LocationWidget";
import ResumeWidget from "@/components/widgets/ResumeWidget";
import AiChatWidget from "@/components/widgets/AiChatWidget";
import { EditorOverlay } from "@/components/editor/EditorOverlay";

export default function EditorGrid() {
  return (
    <div className="w-full max-w-[900px] grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]">
      <div className="col-span-2 row-span-2 bg-surface border border-border rounded-[32px] relative overflow-hidden group ring-2 ring-white ring-offset-2 ring-offset-background">
        <EditorOverlay roundedClass="rounded-[32px]" />
        <div className="widget-content w-full h-full">
          <ProfileWidget className="!border-0 !transform-none hover:!transform-none hover:!shadow-none h-full rounded-[32px]" />
        </div>
      </div>

      <div className="col-span-2 row-span-1 bg-surface border border-border rounded-[24px] relative overflow-hidden group">
        <EditorOverlay roundedClass="rounded-[24px]" />
        <div className="widget-content w-full h-full">
          <SpotifyWidget className="!border-0 !transform-none hover:!transform-none hover:!shadow-none h-full rounded-[24px]" />
        </div>
      </div>

      <div className="col-span-2 row-span-1 bg-surface border border-border rounded-[24px] relative overflow-hidden group">
        <EditorOverlay roundedClass="rounded-[24px]" />
        <div className="widget-content w-full h-full">
          <PortfolioWidget className="!border-0 !transform-none hover:!transform-none hover:!shadow-none h-full rounded-[24px] block" />
        </div>
      </div>

      <div className="col-span-1 row-span-1 bg-surface border border-border rounded-[24px] relative overflow-hidden group">
        <EditorOverlay size="small" roundedClass="rounded-[24px]" />
        <div className="widget-content w-full h-full">
          <LocationWidget className="!border-0 !transform-none hover:!transform-none hover:!shadow-none h-full rounded-[24px]" />
        </div>
      </div>

      <div className="col-span-1 row-span-1 bg-white text-black rounded-[24px] relative overflow-hidden group">
        <EditorOverlay size="resume" roundedClass="rounded-[24px]" />
        <div className="widget-content w-full h-full">
          <ResumeWidget className="!transform-none hover:!transform-none hover:!shadow-none h-full rounded-[24px]" />
        </div>
      </div>

      <div className="col-span-2 row-span-1 bg-surface border border-border rounded-[24px] relative overflow-hidden group">
        <EditorOverlay roundedClass="rounded-[24px]" />
        <div className="widget-content w-full h-full">
          <AiChatWidget className="!border-0 !transform-none hover:!transform-none hover:!shadow-none h-full rounded-[24px]" />
        </div>
      </div>
    </div>
  );
}
