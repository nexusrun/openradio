import type { Metadata } from "next";
import { HistoryList } from "@/components/library/history-list";
import { LibraryPage } from "@/components/library/library-page";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { getLocale } from "@/lib/locale-server";
import { t } from "@/lib/i18n";

export const metadata: Metadata = pageMetadata({
  title: "History",
  description: "Stations you listened to recently, stored on this device.",
  path: "/history",
  noIndex: true,
});

export default async function HistoryPage() {
  const locale = await getLocale();
  return (
    <LibraryPage
      eyebrow={t(locale, "Logbook")}
      title={t(locale, "Recently played")}
      description={t(locale, "Your last 50 stations. Stored on this device only.")}
    >
      <HistoryList />
    </LibraryPage>
  );
}
