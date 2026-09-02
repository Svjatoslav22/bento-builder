import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import OnboardingForm from "@/components/OnboardingForm";

export default async function OnboardingPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect("/");

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-text-primary">
      <section className="mx-auto max-w-xl border border-border bg-surface p-6 sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">Set up your profile</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Make it yours</h1>
        <p className="mt-2 text-sm text-text-secondary">Choose the details people will see on your public bento page.</p>
        <OnboardingForm />
      </section>
    </main>
  );
}