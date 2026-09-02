import Sidebar from "@/components/Sidebar";
import SettingsPanel from "@/components/SettingsPanel";
import BentoGrid from "@/components/BentoGrid";
import LogoutButton from "@/components/LogoutButton";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CopyLinkButton from "@/components/CopyLinkButton";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { username: true, isOnboarded: true, name: true, title: true, bio: true, avatarUrl: true, linkedinUrl: true, githubUrl: true, resumeUrl: true },
  });

  if (!profile?.isOnboarded) redirect("/onboarding");

  const publicLink = `bento-builder.vercel.app/${profile.username}`;

  return (
    <div className="antialiased h-screen flex flex-col md:flex-row overflow-hidden bg-background">
      <Sidebar />

      <main className="flex-1 h-full canvas-bg flex flex-col relative">
        <div className="absolute left-8 right-8 top-5 z-10 flex items-center justify-between gap-4 border border-border bg-surface/90 px-4 py-2.5 backdrop-blur-md">
          <span className="truncate text-xs text-text-secondary">Your public link: {publicLink}</span>
          <CopyLinkButton value={`https://${publicLink}`} />
        </div>
        <div className="flex-1 overflow-y-auto w-full p-8 pb-32 flex justify-center">
          <BentoGrid editorMode profile={profile} />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#121214]/80 backdrop-blur-md border border-border p-2 rounded-2xl shadow-2xl z-30">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl border border-border text-text-primary text-sm font-medium hover:bg-surface-elevated hover:border-gray-500 transition-colors"
          >
            Preview
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            Save Changes
          </button>
        </div>
      </main>

      <SettingsPanel />
      <LogoutButton />
    </div>
  );
}
