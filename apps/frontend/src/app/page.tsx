import LandingContent from "@/components/LandingContent";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  const profile = session?.user?.id
    ? await prisma.profile.findUnique({
        where: { userId: session.user.id },
        select: { userId: true, isOnboarded: true },
      })
    : null;
  if (session && (!profile?.userId || !profile.isOnboarded)) {
    redirect("/onboarding");
  }

  if (session && profile?.userId) {
    redirect("/dashboard");
  }

  return (
    <main className="antialiased relative isolate min-h-screen overflow-hidden bg-[#0a0a0a] px-5 py-10 text-white sm:px-8 lg:flex lg:items-center lg:py-8">
      <div aria-hidden="true" className="pointer-events-none absolute right-[-12rem] top-[-14rem] -z-10 h-[38rem] w-[38rem] rounded-full bg-[#6D5BFF]/25 blur-[130px]" />
      <LandingContent />
    </main>
  );
}
