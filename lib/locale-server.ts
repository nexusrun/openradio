import "server-only";
import { cookies } from "next/headers";
import { LOCALES, type Locale } from "@/lib/i18n-data";

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get("openradio-locale")?.value;
  return LOCALES.includes(value as Locale) ? (value as Locale) : "en";
}
