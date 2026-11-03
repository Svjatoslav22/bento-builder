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
    <main className="antialiased relative isolate min-h-screen overflow-hidden bg-[#0a0a0a] px-5 py-10 text-white sm:px-8 lg:flex lg:items-center lg:py-8">
      <div aria-hidden="true" className="pointer-events-none absolute right-[-12rem] top-[-14rem] -z-10 h-[38rem] w-[38rem] rounded-full bg-[#6D5BFF]/25 blur-[130px]" />
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="mx-auto w-full max-w-xl lg:mx-0">
          <img src="/logo.svg" height={32} alt="Bento Builder" className="mb-6 h-8 w-auto" />
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#a8a3bb]">Ваше портфоліо в одному місці</p>
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-[58px]">
            Створіть свій <span className="text-[#8E7FFF]">bento-профіль</span> розробника
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-[#9A9AA5]">Зберіть свої роботи, дані про себе та резюме на одній публічній сторінці.</p>
          <p className="mt-4 max-w-lg text-sm leading-6 text-[#777781]">Увійдіть, щоб зберегти профіль і створити власну публічну сторінку.</p>
          <div className="mt-7 max-w-md"><AuthButton /></div>
          <ol className="mt-8 flex flex-wrap gap-2 sm:gap-3" aria-label="Як це працює">
            {["Увійти", "Заповнити профіль", "Поділитися посиланням"].map((step, index) => (
              <li key={step} className="flex items-center gap-2 rounded-full border border-[#26262c] bg-[#111114]/80 px-3 py-2 text-xs font-medium text-[#b6b6c0] sm:text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#201d32] text-[11px] text-[#a99fff]">{index + 1}</span>{step}
              </li>
            ))}
          </ol>
        </div>
        <div className="mx-auto w-full max-w-[560px] lg:mx-0 lg:justify-self-end">
          <LandingPreview />
        </div>
      </section>
    </main>
  );
}
