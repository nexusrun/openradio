import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";

function worker(fetchResponse: () => Promise<Response>) {
  const listeners: Record<string, (event: unknown) => void> = {};
  const stored = new Map<string, Response>();
  const cache = {
    match: vi.fn(async (request: Request) => stored.get(request.url)?.clone()),
    put: vi.fn(async (request: Request, response: Response) => {
      stored.set(request.url, response);
    }),
  };
  const fetch = vi.fn(fetchResponse);
  runInNewContext(
    readFileSync(new URL("../public/sw.js", import.meta.url), "utf8"),
    {
      self: {
        location: { origin: "http://localhost:3000" },
        addEventListener: (
          name: string,
          listener: (event: unknown) => void,
        ) => {
          listeners[name] = listener;
        },
      },
      caches: { open: async () => cache },
      fetch,
      URL,
      Response,
    },
  );
  return {
    stored,
    fetch,
    load: () => {
      let response: Promise<Response> | undefined;
      listeners.fetch({
        request: new Request(
          "http://localhost:3000/_next/static/chunks/app.js",
        ),
        respondWith: (value: Promise<Response>) => {
          response = value;
        },
      });
      return response!;
    },
  };
}

describe("service worker client bundles", () => {
  it("replaces a cached old bundle with current code online", async () => {
    const app = worker(async () => new Response("current client"));
    app.stored.set(
      "http://localhost:3000/_next/static/chunks/app.js",
      new Response("old client"),
    );
    expect(await (await app.load()).text()).toBe("current client");
    expect(app.fetch).toHaveBeenCalledOnce();
    expect(await (await app.load()).text()).toBe("current client");
  });

  it("keeps cached bundles available offline", async () => {
    const app = worker(async () => {
      throw new TypeError("offline");
    });
    app.stored.set(
      "http://localhost:3000/_next/static/chunks/app.js",
      new Response("cached client"),
    );
    expect(await (await app.load()).text()).toBe("cached client");
  });
});
