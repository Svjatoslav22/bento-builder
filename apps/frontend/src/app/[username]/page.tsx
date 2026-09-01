import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EditProfileFab from "@/components/EditProfileFab";
import ProfileWidget from "@/components/widgets/ProfileWidget";
import SpotifyWidget from "@/components/widgets/SpotifyWidget";
import PortfolioWidget from "@/components/widgets/PortfolioWidget";
import LocationWidget from "@/components/widgets/LocationWidget";
import ResumeWidget from "@/components/widgets/ResumeWidget";
import AiChatWidget from "@/components/widgets/AiChatWidget";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const profile = await prisma.profile.findUnique({
    where: { username },
    select: { userId: true },
  });

  if (!profile) {
    notFound();
  }

  const session = await getSession();
  const isOwner = session?.user?.id === profile.userId;

  return (
    <div className="antialiased min-h-screen flex items-center justify-center p-4 sm:p-8 bg-background">
      <main className="w-full max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]">
        <ProfileWidget />
        <SpotifyWidget />
        <PortfolioWidget />
        <LocationWidget />
        <ResumeWidget />
        <AiChatWidget />
      </main>

      {isOwner && <EditProfileFab />}
    </div>
  );
}
