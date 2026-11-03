import AuthButton from "@/components/AuthButton";
import LandingPreview from "@/components/LandingPreview";
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
        <h1 className="text-4xl font-semibold tracking-tight text-text-primary">Створіть свій bento-профіль розробника</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-text-secondary">Зберіть свої роботи, дані про себе та резюме на одній публічній сторінці.</p>
        <LandingPreview />
        <ol className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-text-primary">
          <li className="flex gap-3"><span className="text-text-secondary">1.</span>Увійдіть через GitHub або Google.</li>
          <li className="flex gap-3"><span className="text-text-secondary">2.</span>Заповніть коротку форму профілю.</li>
          <li className="flex gap-3"><span className="text-text-secondary">3.</span>Налаштуйте сторінку в редакторі й поділіться посиланням.</li>
        </ol>
        <p className="mx-auto mt-6 max-w-sm text-xs leading-5 text-text-secondary">Вхід потрібен, щоб зберегти ваш профіль і створити публічну сторінку за вашим username.</p>
        <div className="mx-auto mt-6 max-w-xs"><AuthButton /></div>
      </section>
    </main>
  );
}
