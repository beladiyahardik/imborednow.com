export const SITE_NAME = "ImBoredNow";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://www.imborednow.com";

export const SEO_DEFAULTS = {
  title: "ImBoredNow | Games, Tools, and Articles",
  description:
    "Hand-picked games, tools, and useful reads designed for fast breaks without low-quality clutter.",
};

const NOINDEX_PATHS = new Set(["/404", "/bored-ai", "/p/random-activity"]);

export function shouldNoIndex(path: string): boolean {
  const normalized = path.split("?")[0].split("#")[0];
  return NOINDEX_PATHS.has(normalized);
}

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
