export type LandingLang = "uk" | "pl" | "en";

export const LANDING_LANGS: LandingLang[] = ["uk", "pl", "en"];
export const DEFAULT_LANDING_LANG: LandingLang = "uk";
export const LANDING_LANG_STORAGE_KEY = "bento-landing-lang";

export const LANG_NAMES: Record<LandingLang, string> = {
  uk: "Українська",
  pl: "Polski",
  en: "English",
};

export function isLandingLang(value: unknown): value is LandingLang {
  return value === "uk" || value === "pl" || value === "en";
}

export function detectBrowserLang(): LandingLang {
  try {
    const raw = navigator.languages?.[0] ?? navigator.language;
    if (!raw) return DEFAULT_LANDING_LANG;
    const code = raw.toLowerCase().split("-")[0];
    if (code === "uk") return "uk";
    if (code === "pl") return "pl";
    return "en";
  } catch {
    return DEFAULT_LANDING_LANG;
  }
}

export type LandingMessages = {
  switcherLabel: string;
  eyebrow: string;
  titlePrefix: string;
  titleAccent: string;
  titleSuffix: string;
  subtitle: string;
  signInHint: string;
  stepsLabel: string;
  steps: [string, string, string];
  continueWith: string;
  greeting: string;
  signOut: string;
  preview: {
    example: string;
    publicBadge: string;
    profile: string;
    role: string;
    portfolio: string;
    selectedWorks: string;
    stack: string;
    location: string;
    locationValue: string;
    activity: string;
    lastYear: string;
    resume: string;
    downloadPdf: string;
  };
};

export const LANDING_MESSAGES: Record<LandingLang, LandingMessages> = {
  uk: {
    switcherLabel: "Мова інтерфейсу",
    eyebrow: "Ваше портфоліо в одному місці",
    titlePrefix: "Створіть свій ",
    titleAccent: "bento-профіль",
    titleSuffix: " розробника",
    subtitle: "Зберіть свої роботи, дані про себе та резюме на одній публічній сторінці.",
    signInHint: "Увійдіть, щоб зберегти профіль і створити власну публічну сторінку.",
    stepsLabel: "Як це працює",
    steps: ["Увійти", "Заповнити профіль", "Поділитися посиланням"],
    continueWith: "Продовжити з",
    greeting: "Привіт",
    signOut: "Вийти",
    preview: {
      example: "Приклад профілю",
      publicBadge: "ПУБЛІЧНИЙ ПРОФІЛЬ",
      profile: "Профіль",
      role: "Frontend-розробниця",
      portfolio: "Портфоліо",
      selectedWorks: "Вибрані роботи",
      stack: "Стек технологій",
      location: "Локація",
      locationValue: "Київ, Україна",
      activity: "Активність GitHub",
      lastYear: "Останній рік",
      resume: "Резюме",
      downloadPdf: "Завантажити PDF",
    },
  },
  pl: {
    switcherLabel: "Język interfejsu",
    eyebrow: "Twoje portfolio w jednym miejscu",
    titlePrefix: "Stwórz swój ",
    titleAccent: "profil bento",
    titleSuffix: " programisty",
    subtitle: "Zbierz swoje projekty, informacje o sobie i CV na jednej publicznej stronie.",
    signInHint: "Zaloguj się, aby zapisać profil i utworzyć własną publiczną stronę.",
    stepsLabel: "Jak to działa",
    steps: ["Zaloguj się", "Uzupełnij profil", "Udostępnij link"],
    continueWith: "Kontynuuj z",
    greeting: "Cześć",
    signOut: "Wyloguj się",
    preview: {
      example: "Przykładowy profil",
      publicBadge: "PROFIL PUBLICZNY",
      profile: "Profil",
      role: "Programistka frontend",
      portfolio: "Portfolio",
      selectedWorks: "Wybrane projekty",
      stack: "Stos technologii",
      location: "Lokalizacja",
      locationValue: "Kijów, Ukraina",
      activity: "Aktywność GitHub",
      lastYear: "Ostatni rok",
      resume: "CV",
      downloadPdf: "Pobierz PDF",
    },
  },
  en: {
    switcherLabel: "Interface language",
    eyebrow: "Your portfolio in one place",
    titlePrefix: "Create your developer ",
    titleAccent: "bento profile",
    titleSuffix: "",
    subtitle: "Bring your work, your details and your resume together on one public page.",
    signInHint: "Sign in to save your profile and create your own public page.",
    stepsLabel: "How it works",
    steps: ["Sign in", "Fill in your profile", "Share the link"],
    continueWith: "Continue with",
    greeting: "Hi",
    signOut: "Sign out",
    preview: {
      example: "Profile example",
      publicBadge: "PUBLIC PROFILE",
      profile: "Profile",
      role: "Frontend developer",
      portfolio: "Portfolio",
      selectedWorks: "Selected works",
      stack: "Tech stack",
      location: "Location",
      locationValue: "Kyiv, Ukraine",
      activity: "GitHub activity",
      lastYear: "Last year",
      resume: "Resume",
      downloadPdf: "Download PDF",
    },
  },
};

