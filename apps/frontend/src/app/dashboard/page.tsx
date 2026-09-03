import DashboardClient from "@/components/DashboardClient";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: { widgets: true },
  });

  if (!profile?.isOnboarded) redirect("/onboarding");

  return <DashboardClient profile={profile} />;
}
