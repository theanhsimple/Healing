import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 produces a fully static site in out/ for GitHub Pages
 * (see scripts/build-static.mjs). Everything else — Vercel, `next start`,
 * `next dev` — uses the normal server build.
 */
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Partial Prerendering cannot run in export mode; a static export is fully
  // prerendered anyway, so it is only enabled for the server build.
  cacheComponents: !staticExport,
  partialPrefetching: !staticExport,
  images: staticExport
    ? { unoptimized: true }
    : { formats: ["image/avif", "image/webp"], qualities: [75, 85] },
  ...(staticExport ? { output: "export" as const, trailingSlash: true, basePath } : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
