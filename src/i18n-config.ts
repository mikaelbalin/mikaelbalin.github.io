export const i18n = {
  defaultLocale: "en",
  locales: ["en", "pt"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export async function generateLanguageParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
