"use client";

import { useEffect } from "react";

/** Registers the offline service worker in production builds only. */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") {
      // A production worker can still control this origin when switching to dev.
      // Its cached chunks have stable dev URLs, so remove it before using HMR.
      const workerUrl = new URL("/sw.js", window.location.href).href;
      const controlled =
        navigator.serviceWorker.controller?.scriptURL === workerUrl;
      void navigator.serviceWorker
        .getRegistrations()
        .then(async (registrations) => {
          await Promise.all(
            registrations
              .filter((registration) =>
                [
                  registration.active,
                  registration.waiting,
                  registration.installing,
                ].some((worker) => worker?.scriptURL === workerUrl),
              )
              .map((registration) => registration.unregister()),
          );
          if ("caches" in window) {
            const keys = await caches.keys();
            await Promise.all(
              keys
                .filter((key) => key.startsWith("ra-"))
                .map((key) => caches.delete(key)),
            );
          }
          if (controlled) window.location.reload();
        });
      return;
    }
    const register = () =>
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {});
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);
  return null;
}
