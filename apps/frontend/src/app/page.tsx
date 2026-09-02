import AuthButton from "@/components/AuthButton";
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
    <main className="antialiased min-h-screen flex items-center justify-center p-6 bg-background">
      <section className="w-full max-w-xl border border-border bg-surface p-8 sm:p-12 text-center shadow-2xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">Bento Builder</p>
        <h1 className="text-4xl font-semibold tracking-tight text-text-primary">Create your developer bento-profile</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-text-secondary">Turn your work, identity, and favorite tools into one focused public profile.</p>
        <div className="mx-auto mt-8 max-w-xs"><AuthButton /></div>
      </section>
    </main>
  );
}
