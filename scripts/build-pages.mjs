/**
 * Builds everything the gh-pages branch serves, into dist-pages/:
 *
 *   dist-pages/      basePath /Healing  → https://theanhsimple.github.io/Healing/
 *   dist-pages/rt/   basePath /healing  → https://rabbittarot.io.vn/healing/
 *
 * The rt/ copy is never visited directly: the Cloudflare Worker in
 * deploy/cloudflare-worker.js forwards rabbittarot.io.vn/healing/* to it.
 * Two builds are needed because Next.js bakes the base path into every URL.
 */
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, rmSync } from "node:fs";

const DIST = "dist-pages";
const builds = [
  { dir: DIST, basePath: "/Healing", siteUrl: "https://theanhsimple.github.io/Healing" },
  { dir: `${DIST}/rt`, basePath: "/healing", siteUrl: "https://rabbittarot.io.vn/healing" },
];

rmSync(DIST, { recursive: true, force: true });
for (const b of builds) {
  console.log(`\n▸ Building for ${b.siteUrl}`);
  const { status } = spawnSync("node", ["scripts/build-static.mjs"], {
    stdio: "inherit",
    env: { ...process.env, NEXT_PUBLIC_BASE_PATH: b.basePath, NEXT_PUBLIC_SITE_URL: b.siteUrl },
  });
  if (status !== 0 || !existsSync("out/index.html")) process.exit(status || 1);
  cpSync("out", b.dir, { recursive: true });
}
console.log(`\n✓ ${DIST}/ ready for the gh-pages branch`);
