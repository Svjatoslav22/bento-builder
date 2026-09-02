import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EditProfileFab from "@/components/EditProfileFab";
import BentoGrid from "@/components/BentoGrid";
import LogoutButton from "@/components/LogoutButton";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const profile = await prisma.profile.findUnique({
    where: { username },
    select: { userId: true, isOnboarded: true, name: true, title: true, bio: true, avatarUrl: true, linkedinUrl: true, githubUrl: true, resumeUrl: true },
  });

  if (!profile || !profile.isOnboarded) {
    notFound();
  }

  const session = await getSession();
  const isOwner = session?.user?.id === profile.userId;

  return (
    <div className="antialiased min-h-screen flex items-center justify-center p-4 sm:p-8 bg-background">
      <BentoGrid profile={profile} />

      {isOwner && <EditProfileFab />}
      {session && <LogoutButton />}
    </div>
  );
}
