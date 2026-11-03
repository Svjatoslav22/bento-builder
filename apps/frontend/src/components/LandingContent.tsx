"use client";

import AuthButton from "@/components/AuthButton";
import LandingPreview from "@/components/LandingPreview";
import { LanguageSwitcher, LandingLanguageProvider, useLandingLanguage } from "@/components/LandingLanguage";

function LandingBody() {
  const { t } = useLandingLanguage();

  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
      <div className="mx-auto w-full max-w-xl lg:mx-0">
        <div className="mb-6 flex items-center justify-between gap-4">
          <img src="/logo.svg" height={32} alt="Bento Builder" className="h-8 w-auto" />
          <LanguageSwitcher />
        </div>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#a8a3bb]">{t.eyebrow}</p>
        <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-[58px]">
          {t.titlePrefix}<span className="text-[#8E7FFF]">{t.titleAccent}</span>{t.titleSuffix}
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-[#9A9AA5]">{t.subtitle}</p>
        <p className="mt-4 max-w-lg text-sm leading-6 text-[#777781]">{t.signInHint}</p>
        <div className="mt-7 max-w-md"><AuthButton /></div>
        <ol className="mt-8 flex flex-wrap gap-2 sm:gap-3" aria-label={t.stepsLabel}>
          {t.steps.map((step, index) => (
            <li key={index} className="flex items-center gap-2 rounded-full border border-[#26262c] bg-[#111114]/80 px-3 py-2 text-xs font-medium text-[#b6b6c0] sm:text-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#201d32] text-[11px] text-[#a99fff]">{index + 1}</span>{step}
            </li>
          ))}
        </ol>
      </div>
      <div className="mx-auto w-full max-w-[560px] lg:mx-0 lg:justify-self-end">
        <LandingPreview />
      </div>
    </section>
  );
}

export default function LandingContent() {
  return (
    <LandingLanguageProvider>
      <LandingBody />
    </LandingLanguageProvider>
  );
}

