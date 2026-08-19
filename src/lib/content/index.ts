import type { ContentProvider } from "./content.types";
import { FileSystemContentProvider } from "./fs-content-provider";

/**
 * Singleton Content Repository Access Point
 *
 * To plug in Strapi / Sanity / Ghost / Authority Closers Monorepo API in the future:
 * Simply replace `new FileSystemContentProvider()` with `new HeadlessCmsProvider(config)`
 * or select via environment variable (`process.env.CMS_PROVIDER`).
 * No UI components or page routes will need to change!
 */
export const contentProvider: ContentProvider = new FileSystemContentProvider();

export function formatContentDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export * from "./content.types";
