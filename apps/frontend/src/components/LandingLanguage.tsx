"use client";

import { createContext, useContext, useEffect, useRef, useSyncExternalStore, type KeyboardEvent } from "react";
import {
  DEFAULT_LANDING_LANG,
  LANDING_LANGS,
  LANDING_LANG_STORAGE_KEY,
  LANDING_MESSAGES,
  LANG_NAMES,
  isLandingLang,
  type LandingLang,
  type LandingMessages,
} from "@/lib/landingI18n";

const CHANGE_EVENT = "bento-landing-lang-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot(): LandingLang {
  try {
    const stored = window.localStorage.getItem(LANDING_LANG_STORAGE_KEY);
    if (isLandingLang(stored)) return stored;
  } catch {
    // localStorage unavailable: use the Ukrainian default.
  }
  return DEFAULT_LANDING_LANG;
}

// Server and hydration render use the default language; the client then
// re-renders with the real value without a hydration mismatch.
function getServerSnapshot(): LandingLang {
  return DEFAULT_LANDING_LANG;
}

function setLang(lang: LandingLang) {
  try {
    window.localStorage.setItem(LANDING_LANG_STORAGE_KEY, lang);
  } catch {
    // Ignore storage errors; still notify subscribers below.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

type LandingLanguageContextValue = { lang: LandingLang; t: LandingMessages };

const LandingLanguageContext = createContext<LandingLanguageContextValue>({
  lang: DEFAULT_LANDING_LANG,
  t: LANDING_MESSAGES[DEFAULT_LANDING_LANG],
});

export function LandingLanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LandingLanguageContext.Provider value={{ lang, t: LANDING_MESSAGES[lang] }}>
      {children}
    </LandingLanguageContext.Provider>
  );
}

export function useLandingLanguage() {
  return useContext(LandingLanguageContext);
}

export function LanguageSwitcher() {
  const { lang, t } = useLandingLanguage();
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = LANDING_LANGS.indexOf(lang);
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % LANDING_LANGS.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + LANDING_LANGS.length) % LANDING_LANGS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = LANDING_LANGS.length - 1;
    else return;
    event.preventDefault();
    const nextLang = LANDING_LANGS[next];
    setLang(nextLang);
    buttons.current[nextLang]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={t.switcherLabel}
      onKeyDown={onKeyDown}
      className="inline-flex items-center gap-0.5 rounded-full border border-[#292832] bg-[#111114]/80 p-0.5"
    >
      {LANDING_LANGS.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            ref={(node) => {
              buttons.current[code] = node;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={LANG_NAMES[code]}
            lang={code}
            title={LANG_NAMES[code]}
            tabIndex={active ? 0 : -1}
            onClick={() => setLang(code)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D5BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
              active ? "bg-[#6D5BFF] text-white shadow-[0_0_14px_rgba(109,91,255,0.35)]" : "text-[#9A9AA5] hover:text-white"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}

