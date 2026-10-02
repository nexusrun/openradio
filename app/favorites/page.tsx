import type { Metadata } from "next";
import { FavoritesList } from "@/components/library/favorites-list";
import { LibraryPage } from "@/components/library/library-page";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { getLocale } from "@/lib/locale-server";
import { t } from "@/lib/i18n";

export const metadata: Metadata = pageMetadata({
  title: "Favorites",
  description: "Your saved radio stations, stored on this device.",
  path: "/favorites",
  noIndex: true,
});

export default async function FavoritesPage() {
  const locale = await getLocale();
  return (
    <LibraryPage
      eyebrow={t(locale, "Your presets")}
      title={t(locale, "Favorites")}
      description={t(locale, "Saved on this device only. No account needed.")}
    >
      <FavoritesList />
    </LibraryPage>
  );
}
