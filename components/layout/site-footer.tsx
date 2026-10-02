import Link from "next/link";
import { Suspense } from "react";
import { VisitTotal } from "@/components/analytics/visit-total";
import { GithubIcon } from "@/components/icons/github";
import { FOOTER_NAV } from "@/lib/navigation";
import { REPO_URL } from "@/lib/site";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-data";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          Station data from{" "}
          <a
            href="https://www.radio-browser.info"
            className="underline underline-offset-4 hover:text-text"
            rel="noopener noreferrer"
            target="_blank"
          >
            Radio Browser
          </a>
          . Streams belong to their stations.
        </p>
        <p className="sr-only">{t(locale, "Language preference")}</p>
        <div className="flex items-center gap-4">
          <Suspense fallback={null}>
            <VisitTotal />
          </Suspense>
          <nav aria-label="Footer" className="flex gap-4">
            {FOOTER_NAV.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-text">
                {t(locale, label)}
              </Link>
            ))}
            {/*
             * Named GitHub rather than "Source": the mark and the name together
             * say where the link goes before it is clicked, which "Source" did
             * not. The label stays visible so it does not rely on the icon.
             */}
            <a
              href={REPO_URL}
              className="flex items-center gap-1.5 hover:text-text"
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
            <a
              href="https://nexusai.run"
              className="hover:text-text"
              rel="noopener noreferrer"
              target="_blank"
            >
              Powered by NEXUS AI
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
