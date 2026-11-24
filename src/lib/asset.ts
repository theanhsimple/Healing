/**
 * Prefixes a /public path with the deployment base path.
 *
 * Links get `basePath` automatically, but next/image `src` and raw media
 * URLs do not. Empty by default (Vercel, local); "/Healing" for the
 * GitHub Pages static preview (see scripts/build-static.mjs).
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
