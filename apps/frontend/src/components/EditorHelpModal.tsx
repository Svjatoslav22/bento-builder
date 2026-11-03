"use client";

import { useEffect, useState } from "react";

type EditorHelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type HelpLanguage = "uk" | "en" | "pl";

type HelpStep = {
  title: string;
  text: string;
};

type HelpTranslation = {
  title: string;
  closeLabel: string;
  switcherLabel: string;
  steps: HelpStep[];
};

const HELP_LANG_KEY = "bento-editor-help-lang";

const languageOptions: { code: HelpLanguage; label: string; ariaLabel: string }[] = [
  { code: "uk", label: "UK", ariaLabel: "Українська (UK)" },
  { code: "en", label: "EN", ariaLabel: "English (EN)" },
  { code: "pl", label: "PL", ariaLabel: "Polski (PL)" },
];

const translations: Record<HelpLanguage, HelpTranslation> = {
  uk: {
    title: "Як це працює",
    closeLabel: "Зрозуміло",
    switcherLabel: "Мова",
    steps: [
      {
        title: "Це ваш публічний профіль",
        text: "Усе, що ви створите тут, стане вашою публічною сторінкою-портфоліо.",
      },
      {
        title: "Додавайте та впорядковуйте віджети",
        text: "Вибирайте віджети на лівій панелі (до 6). Наведіть курсор або натисніть на віджет у сітці, щоб перетягнути, змінити розмір або видалити його. Використовуйте праву панель для налаштування вибраного віджета.",
      },
      {
        title: "Публікуйте кнопкою Save Changes",
        text: "Зміни не публікуються автоматично. Натисніть Save Changes унизу, щоб оновити свою публічну сторінку.",
      },
      {
        title: "Переглядайте та діліться",
        text: "Кнопка Preview відкриває вашу публічну сторінку в новій вкладці. Скопіюйте своє публічне посилання з верхньої панелі.",
      },
    ],
  },
  en: {
    title: "How it works",
    closeLabel: "Got it",
    switcherLabel: "Language",
    steps: [
      {
        title: "This is your public profile",
        text: "What you build here becomes your public portfolio page.",
      },
      {
        title: "Add and arrange widgets",
        text: "Pick widgets in the left sidebar (up to 6). Hover or click a widget on the grid to drag it, resize it or delete it. Use the right panel to configure the selected widget.",
      },
      {
        title: "Publish with Save Changes",
        text: "Changes are not published automatically. Click Save Changes at the bottom to update your public page.",
      },
      {
        title: "Preview and share",
        text: "Preview opens your public page in a new tab. Copy your public link from the bar at the top.",
      },
    ],
  },
  pl: {
    title: "Jak to działa",
    closeLabel: "Rozumiem",
    switcherLabel: "Język",
    steps: [
      {
        title: "To jest Twój profil publiczny",
        text: "To, co tutaj zbudujesz, stanie się Twoją publiczną stroną portfolio.",
      },
      {
        title: "Dodawaj i układaj widżety",
        text: "Wybierz widżety na lewym pasku bocznym (do 6). Najedź kursorem lub kliknij widżet na siatce, aby go przeciągnąć, zmienić jego rozmiar lub usunąć. Użyj prawego panelu, aby skonfigurować wybrany widżet.",
      },
      {
        title: "Opublikuj za pomocą Save Changes",
        text: "Zmiany nie są publikowane automatycznie. Kliknij Save Changes na dole, aby zaktualizować swoją stronę publiczną.",
      },
      {
        title: "Podgląd i udostępnianie",
        text: "Przycisk Preview otwiera Twoją stronę publiczną w nowej karcie. Skopiuj swój publiczny link z paska na górze.",
      },
    ],
  },
};

function isHelpLanguage(value: string | null): value is HelpLanguage {
  return value === "uk" || value === "en" || value === "pl";
}

function detectBrowserLanguage(): HelpLanguage {
  if (typeof window === "undefined") return "en";
  const preferred = (window.navigator.languages?.[0] || window.navigator.language || "").toLowerCase();
  if (preferred.startsWith("uk")) return "uk";
  if (preferred.startsWith("pl")) return "pl";
  return "en";
}

export default function EditorHelpModal({ isOpen, onClose }: EditorHelpModalProps) {
  const [lang, setLang] = useState<HelpLanguage>("en");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(HELP_LANG_KEY);
        if (isHelpLanguage(stored)) {
          setLang(stored);
          return;
        }
      } catch {
        // Ignore storage errors and fall back to browser language.
      }
      setLang(detectBrowserLanguage());
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  function selectLanguage(nextLang: HelpLanguage) {
    setLang(nextLang);
    try {
      window.localStorage.setItem(HELP_LANG_KEY, nextLang);
    } catch {
      // Ignore storage errors.
    }
  }

  if (!isOpen) return null;

  const content = translations[lang];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-help-title"
        lang={lang}
        onClick={(event) => event.stopPropagation()}
        className="max-h-full w-full max-w-md overflow-y-auto rounded-xl border border-border bg-surface p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id="editor-help-title" className="text-base font-semibold text-text-primary">
            {content.title}
          </h2>
          <div
            role="group"
            aria-label={content.switcherLabel}
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-elevated p-1"
          >
            {languageOptions.map((option) => {
              const isActive = lang === option.code;
              return (
                <button
                  key={option.code}
                  type="button"
                  aria-label={option.ariaLabel}
                  aria-pressed={isActive}
                  onClick={() => selectLanguage(option.code)}
                  className={`rounded-md px-2 py-1 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    isActive
                      ? "bg-white text-black shadow-sm"
                      : "text-text-secondary hover:bg-surface hover:text-text-primary"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
        <ol className="mt-4 space-y-4">
          {content.steps.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-xs font-medium text-text-primary">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-text-primary">{step.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            autoFocus
            onClick={onClose}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {content.closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

