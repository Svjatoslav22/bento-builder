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
  onboarding: {
    step: string;
    stepLabel: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    about: string;
    files: string;
    links: string;
    username: string;
    usernameHelper: string;
    usernameRequired: string;
    usernameInvalid: string;
    usernameChecking: string;
    usernameAvailable: string;
    usernameTaken: string;
    usernameCheckFailed: string;
    name: string;
    nameHelper: string;
    nameRequired: string;
    role: string;
    roleHelper: string;
    bio: string;
    bioHelper: string;
    bioPlaceholder: string;
    avatar: string;
    avatarHelper: string;
    avatarDrop: string;
    avatarChoose: string;
    avatarError: string;
    resume: string;
    resumeHelper: string;
    resumeDrop: string;
    resumeChoose: string;
    resumeErrorType: string;
    resumeErrorSize: string;
    megabytes: string;
    linkedin: string;
    github: string;
    optional: string;
    linkedinHelper: string;
    githubHelper: string;
    rolePlaceholder: string;
    linkedinPlaceholder: string;
    githubPlaceholder: string;
    previewTitle: string;
    previewName: string;
    previewRole: string;
    previewBio: string;
    previewResume: string;
    previewResumeEmpty: string;
    previewSocials: string;
    submit: string;
    submitting: string;
    submitError: string;
    cropTitle: string;
    cropZoom: string;
    cropCancel: string;
    cropSave: string;
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
    onboarding: {
      step: "Крок 2 з 3",
      stepLabel: "Налаштування профілю, крок 2 з 3",
      eyebrow: "Налаштування профілю",
      title: "Зробіть профіль своїм",
      subtitle: "Це побачать рекрутери на вашій публічній сторінці. Займе менше хвилини.",
      about: "Про вас",
      files: "Файли",
      links: "Посилання",
      username: "Ім’я користувача",
      usernameHelper: "Лише латинські літери, цифри й підкреслення. Від 3 до 30 символів.",
      usernameRequired: "Вкажіть ім’я користувача.",
      usernameInvalid: "Використайте 3–30 латинських літер, цифр або підкреслень.",
      usernameChecking: "Перевіряємо…",
      usernameAvailable: "Вільно",
      usernameTaken: "Зайнято",
      usernameCheckFailed: "Не вдалося перевірити доступність. Можна спробувати продовжити.",
      name: "Ім’я",
      nameHelper: "Вкажіть ім’я, яке буде видно у вашому профілі.",
      nameRequired: "Вкажіть ім’я.",
      role: "Посада / роль",
      roleHelper: "Наприклад: Frontend-розробниця.",
      bio: "Про себе",
      bioHelper: "Коротко розкажіть, що ви створюєте.",
      bioPlaceholder: "Розкажіть, над чим ви працюєте…",
      avatar: "Фото профілю",
      avatarHelper: "Додайте зображення або перетягніть його сюди.",
      avatarDrop: "Перетягніть фото сюди",
      avatarChoose: "Обрати фото",
      avatarError: "Оберіть файл зображення.",
      resume: "Резюме",
      resumeHelper: "PDF, до 5 МБ.",
      resumeDrop: "Перетягніть PDF сюди",
      resumeChoose: "Обрати PDF",
      resumeErrorType: "Оберіть файл у форматі PDF.",
      resumeErrorSize: "Файл має бути меншим за 5 МБ.",
      megabytes: "МБ",
      linkedin: "LinkedIn",
      github: "GitHub",
      optional: "необов’язково",
      linkedinHelper: "Посилання на ваш профіль LinkedIn.",
      githubHelper: "Посилання на ваш профіль GitHub.",
      rolePlaceholder: "Наприклад: Frontend-розробниця",
      linkedinPlaceholder: "https://linkedin.com/in/ваше-ім’я",
      githubPlaceholder: "https://github.com/ваше-ім’я",
      previewTitle: "Так вас побачать",
      previewName: "Ваше ім’я",
      previewRole: "Ваша посада або роль",
      previewBio: "Короткий опис з’явиться тут, щойно ви його додасте.",
      previewResume: "Резюме",
      previewResumeEmpty: "PDF-файл ще не додано",
      previewSocials: "Посилання на профілі",
      submit: "Завершити й відкрити редактор",
      submitting: "Створюємо профіль…",
      submitError: "Не вдалося створити профіль. Спробуйте ще раз.",
      cropTitle: "Обрізати фото профілю",
      cropZoom: "Масштаб",
      cropCancel: "Скасувати",
      cropSave: "Зберегти фото",
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
    onboarding: {
      step: "Krok 2 z 3",
      stepLabel: "Konfiguracja profilu, krok 2 z 3",
      eyebrow: "Konfiguracja profilu",
      title: "Dopasuj profil do siebie",
      subtitle: "To zobaczą rekruterzy na Twojej publicznej stronie. Zajmie mniej niż minutę.",
      about: "O Tobie",
      files: "Pliki",
      links: "Linki",
      username: "Nazwa użytkownika",
      usernameHelper: "Użyj liter łacińskich, cyfr i podkreśleń. Od 3 do 30 znaków.",
      usernameRequired: "Wpisz nazwę użytkownika.",
      usernameInvalid: "Użyj 3–30 liter łacińskich, cyfr lub podkreśleń.",
      usernameChecking: "Sprawdzanie…",
      usernameAvailable: "Dostępna",
      usernameTaken: "Zajęta",
      usernameCheckFailed: "Nie udało się sprawdzić dostępności. Możesz spróbować kontynuować.",
      name: "Imię i nazwisko",
      nameHelper: "Podaj nazwę, która będzie widoczna w Twoim profilu.",
      nameRequired: "Wpisz imię i nazwisko.",
      role: "Stanowisko / rola",
      roleHelper: "Na przykład: Frontend Developer.",
      bio: "O mnie",
      bioHelper: "Krótko opowiedz, co tworzysz.",
      bioPlaceholder: "Opowiedz, nad czym pracujesz…",
      avatar: "Zdjęcie profilowe",
      avatarHelper: "Dodaj obraz lub przeciągnij go tutaj.",
      avatarDrop: "Upuść zdjęcie tutaj",
      avatarChoose: "Wybierz zdjęcie",
      avatarError: "Wybierz plik obrazu.",
      resume: "CV",
      resumeHelper: "PDF, do 5 MB.",
      resumeDrop: "Upuść plik PDF tutaj",
      resumeChoose: "Wybierz PDF",
      resumeErrorType: "Wybierz plik w formacie PDF.",
      resumeErrorSize: "Plik musi mieć mniej niż 5 MB.",
      megabytes: "MB",
      linkedin: "LinkedIn",
      github: "GitHub",
      optional: "opcjonalnie",
      linkedinHelper: "Link do Twojego profilu LinkedIn.",
      githubHelper: "Link do Twojego profilu GitHub.",
      rolePlaceholder: "Na przykład: Frontend Developer",
      linkedinPlaceholder: "https://linkedin.com/in/twoja-nazwa",
      githubPlaceholder: "https://github.com/twoja-nazwa",
      previewTitle: "Tak zobaczą Cię inni",
      previewName: "Twoje imię i nazwisko",
      previewRole: "Twoje stanowisko lub rola",
      previewBio: "Krótki opis pojawi się tutaj, gdy go dodasz.",
      previewResume: "CV",
      previewResumeEmpty: "Nie dodano jeszcze pliku PDF",
      previewSocials: "Profile społecznościowe",
      submit: "Zakończ i otwórz edytor",
      submitting: "Tworzenie profilu…",
      submitError: "Nie udało się utworzyć profilu. Spróbuj ponownie.",
      cropTitle: "Przytnij zdjęcie profilowe",
      cropZoom: "Powiększenie",
      cropCancel: "Anuluj",
      cropSave: "Zapisz zdjęcie",
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
    onboarding: {
      step: "Step 2 of 3",
      stepLabel: "Profile setup, step 2 of 3",
      eyebrow: "Profile setup",
      title: "Make your profile yours",
      subtitle: "Recruiters will see this on your public page. It takes less than a minute.",
      about: "About you",
      files: "Files",
      links: "Links",
      username: "Username",
      usernameHelper: "Use Latin letters, numbers, and underscores. 3–30 characters.",
      usernameRequired: "Enter a username.",
      usernameInvalid: "Use 3–30 Latin letters, numbers, or underscores.",
      usernameChecking: "Checking…",
      usernameAvailable: "Available",
      usernameTaken: "Taken",
      usernameCheckFailed: "Could not check availability. You can try to continue.",
      name: "Name",
      nameHelper: "Enter the name people will see on your profile.",
      nameRequired: "Enter your name.",
      role: "Title / Role",
      roleHelper: "For example: Frontend Developer.",
      bio: "Bio",
      bioHelper: "Briefly tell people what you build.",
      bioPlaceholder: "Tell people what you’re working on…",
      avatar: "Profile photo",
      avatarHelper: "Add an image or drag it here.",
      avatarDrop: "Drop a photo here",
      avatarChoose: "Choose photo",
      avatarError: "Choose an image file.",
      resume: "Resume",
      resumeHelper: "PDF, up to 5 MB.",
      resumeDrop: "Drop a PDF here",
      resumeChoose: "Choose PDF",
      resumeErrorType: "Choose a PDF file.",
      resumeErrorSize: "The file must be smaller than 5 MB.",
      megabytes: "MB",
      linkedin: "LinkedIn",
      github: "GitHub",
      optional: "optional",
      linkedinHelper: "Link to your LinkedIn profile.",
      githubHelper: "Link to your GitHub profile.",
      rolePlaceholder: "For example: Frontend Developer",
      linkedinPlaceholder: "https://linkedin.com/in/your-name",
      githubPlaceholder: "https://github.com/your-name",
      previewTitle: "How others will see you",
      previewName: "Your name",
      previewRole: "Your title or role",
      previewBio: "Your short bio will appear here once you add it.",
      previewResume: "Resume",
      previewResumeEmpty: "No PDF added yet",
      previewSocials: "Social profiles",
      submit: "Finish and open editor",
      submitting: "Creating profile…",
      submitError: "Could not create your profile. Please try again.",
      cropTitle: "Crop profile photo",
      cropZoom: "Zoom",
      cropCancel: "Cancel",
      cropSave: "Save photo",
    },
  },
};

