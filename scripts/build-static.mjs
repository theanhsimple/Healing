/**
 * Static preview build for GitHub Pages: https://theanhsimple.github.io/Healing/
 *
 * Static export cannot run Proxy, so src/proxy.ts is set aside during the
 * build and always restored. Unknown, draft and private postcards are simply
 * not generated; GitHub Pages serves 404.html (with a 404 status) for them.
 * Uses the development mock data — this is a preview, not production.
 */
import { spawnSync } from "node:child_process";
import { existsSync, renameSync, writeFileSync } from "node:fs";

const proxy = "src/proxy.ts";
const parked = "src/proxy.ts.static-build";
const env = {
  ...process.env,
  STATIC_EXPORT: "1",
  CONTENT_SOURCE: "mock",
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? "/Healing",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://theanhsimple.github.io/Healing",
};

// Today-only message files for the home page (public/daily-messages/).
const daily = spawnSync("node", ["scripts/build-daily-messages.mjs"], { stdio: "inherit", env });
if (daily.status !== 0) process.exit(daily.status ?? 1);

const hadProxy = existsSync(proxy);
if (hadProxy) renameSync(proxy, parked);
let status = 1;
try {
  status = spawnSync("npx", ["next", "build"], { stdio: "inherit", env }).status ?? 1;
} finally {
  if (hadProxy) renameSync(parked, proxy);
}
if (status === 0) {
  // GitHub Pages must not run Jekyll, or it drops the _next/ folder.
  writeFileSync("out/.nojekyll", "");
}
process.exit(status);
