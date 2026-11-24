/**
 * Writes one small JSON file per publishable daily message:
 *
 *   public/daily-messages/2026-11-24.json   (reader-facing fields only)
 *
 * The home page fetches only today's file, so the page stays light however
 * large the Master Message Library grows. Validation and the
 * approved/published filter live in src/lib/daily-messages/library.ts;
 * this script just runs them (Node strips the TypeScript types).
 *
 * Runs automatically before `dev`, `build` and the static builds.
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

// library.ts imports "server-only", which only loads under the react-server
// condition: re-run this file under it.
if (!process.execArgv.includes("--conditions=react-server")) {
  const { status } = spawnSync(process.execPath, ["--conditions=react-server", "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", ...process.argv.slice(1)], { stdio: "inherit" });
  process.exit(status ?? 1);
}

const { getPublicMessages } = await import("../src/lib/daily-messages/library.ts");

const OUT = path.join(process.cwd(), "public", "daily-messages");
const messages = getPublicMessages();

// Start clean, so a record that is no longer approved disappears.
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const byDate = new Map();
for (const m of messages) (byDate.get(m.date) ?? byDate.set(m.date, []).get(m.date)).push(m);
for (const [date, list] of byDate) writeFileSync(path.join(OUT, `${date}.json`), JSON.stringify(list));

const drafts = process.env.DAILY_MESSAGES_PREVIEW_DRAFTS === "1" ? " (including drafts: local preview only)" : "";
console.log(`✓ Daily messages: ${byDate.size} days written to public/daily-messages${drafts}`);
