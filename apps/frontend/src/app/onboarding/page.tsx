import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import OnboardingForm from "@/components/OnboardingForm";
import { LandingLanguageProvider } from "@/components/LandingLanguage";

export default async function OnboardingPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect("/");

  return (
    <LandingLanguageProvider>
      <OnboardingForm />
    </LandingLanguageProvider>
  );
}
