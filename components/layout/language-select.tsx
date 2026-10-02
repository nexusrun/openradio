"use client";

import { localeNames, type Locale } from "@/lib/i18n-data";

export function LanguageSelect({ locale }: { locale: Locale }) {
  return (
    <label className="flex items-center gap-2 text-xs text-muted">
      <span className="sr-only">Language preference</span>
      <select
        aria-label="Language preference"
        value={locale}
        onChange={(event) => {
          document.cookie = `openradio-locale=${event.target.value}; path=/; max-age=31536000; samesite=lax`;
          window.location.reload();
        }}
        className="rounded-full border border-border bg-background px-2 py-1.5 text-text"
      >
        {Object.entries(localeNames).map(([code, name]) => (
          <option key={code} value={code}>{name}</option>
        ))}
      </select>
    </label>
  );
}
