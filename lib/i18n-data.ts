export const LOCALES = ["en", "es", "fr", "ar", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const localeNames: Record<Locale, string> = {
  en: "English", es: "Español", fr: "Français", ar: "العربية", pt: "Português",
};
