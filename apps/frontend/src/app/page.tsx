import BentoGrid from "@/components/BentoGrid";
import EditProfileFab from "@/components/EditProfileFab";
import LogoutButton from "@/components/LogoutButton";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await getSession();
  const profile = session?.user?.id
    ? await prisma.profile.findUnique({
        where: { userId: session.user.id },
        select: { userId: true },
      })
    : null;
  const isOwner = Boolean(session?.user?.id && profile?.userId === session.user.id);

  return (
    <div className="antialiased min-h-screen flex items-center justify-center p-4 sm:p-8 bg-background">
      <BentoGrid />
      {isOwner && <EditProfileFab />}
      {session && <LogoutButton />}
    </div>
  );
}
