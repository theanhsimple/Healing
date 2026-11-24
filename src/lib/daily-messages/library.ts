import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Little Postcard — Master Message Library.
 *
 * Source of truth: content/daily-messages/*.json (one file per batch, kept
 * exactly as delivered by the editorial team). See
 * content/daily-messages/README.md and EDITORIAL_GUIDELINES.md.
 *
 * Read at build time only. Every batch is validated; a malformed record
 * fails the build with a message naming the file and message_id, rather
 * than silently showing the wrong thing on the site.
 */

export const CONTENT_TYPES = ["daily_message", "special_day", "episode_message"] as const;
export const STATUSES = ["draft", "approved", "published"] as const;
/** Guidelines §9: only these reach readers. */
export const PUBLISHABLE: ReadonlySet<Status> = new Set(["approved", "published"]);

/** Guidelines §4. Other values are allowed but reported at build time. */
export const CATEGORIES = [
  "A Quiet Mind",
  "The Art of Living",
  "Nature Notes",
  "The World of Art",
  "Little Journeys",
  "Human Stories",
  "Time & Memory",
  "Music & Sound",
  "Creative Life",
  "Small Joys",
  "Relationships & Connections",
  "Change & New Beginnings",
  "Science & Curiosity",
  "Philosophy & Perspective",
  "Tomorrow & Possibility",
] as const;

type ContentType = (typeof CONTENT_TYPES)[number];
type Status = (typeof STATUSES)[number];

/** A record exactly as stored in the library (guidelines §5). */
export interface MessageRecord {
  message_id: string;
  publish_date: string;
  content_type: ContentType;
  category: string;
  title: string;
  message: string;
  closing_line: string | null;
  mood: string;
  visual_direction: string;
  related_episode_id: string | null;
  special_day: string | null;
  editorial_note: string;
  status: Status;
}

/**
 * What the website is allowed to send to the browser. editorial_note and
 * status never leave the server (guidelines §9); visual_direction is a
 * brief for illustrators, not reader-facing copy.
 */
export interface PublicMessage {
  id: string;
  date: string;
  contentType: ContentType;
  category: string;
  title: string;
  message: string;
  closingLine: string | null;
  mood: string;
  relatedEpisodeId: string | null;
  specialDay: string | null;
}

const DIR = path.join(process.cwd(), "content", "daily-messages");
const FIELDS: (keyof MessageRecord)[] = [
  "message_id",
  "publish_date",
  "content_type",
  "category",
  "title",
  "message",
  "closing_line",
  "mood",
  "visual_direction",
  "related_episode_id",
  "special_day",
  "editorial_note",
  "status",
];
const NULLABLE = new Set<keyof MessageRecord>(["closing_line", "related_episode_id", "special_day"]);

function isIsoDate(s: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(`${s}T00:00:00Z`).toISOString().startsWith(s);
}

function validate(raw: unknown, where: string): MessageRecord {
  const errors: string[] = [];
  const r = raw as Record<string, unknown>;
  if (!r || typeof r !== "object") throw new Error(`${where}: record is not an object`);
  const id = typeof r.message_id === "string" ? r.message_id : "(no message_id)";

  for (const f of FIELDS) {
    const v = r[f];
    if (v === undefined) errors.push(`missing field "${f}"`);
    else if (v === null ? !NULLABLE.has(f) : typeof v !== "string") errors.push(`"${f}" must be a string${NULLABLE.has(f) ? " or null" : ""}`);
    else if (typeof v === "string" && !v.trim() && !NULLABLE.has(f)) errors.push(`"${f}" is empty`);
  }
  if (errors.length === 0) {
    const rec = r as unknown as MessageRecord;
    if (!isIsoDate(rec.publish_date)) errors.push(`publish_date "${rec.publish_date}" is not a valid YYYY-MM-DD date`);
    if (!/^LP-DM-\d{8}$/.test(rec.message_id)) errors.push(`message_id must look like LP-DM-YYYYMMDD`);
    else if (rec.message_id !== `LP-DM-${rec.publish_date.replaceAll("-", "")}`)
      errors.push(`message_id does not match publish_date ${rec.publish_date}`);
    if (!CONTENT_TYPES.includes(rec.content_type)) errors.push(`content_type must be one of ${CONTENT_TYPES.join(", ")}`);
    if (!STATUSES.includes(rec.status)) errors.push(`status must be one of ${STATUSES.join(", ")}`);
  }
  if (errors.length) throw new Error(`Daily message library — ${where}, ${id}:\n  - ${errors.join("\n  - ")}`);
  return r as unknown as MessageRecord;
}

let cache: MessageRecord[] | undefined;

/** Every record from every batch, validated, sorted by date. */
export function loadLibrary(): MessageRecord[] {
  if (cache) return cache;
  const files = readdirSync(DIR).filter((f) => f.endsWith(".json")).sort();
  const records: MessageRecord[] = [];
  const seen = new Map<string, string>();

  for (const file of files) {
    const data = JSON.parse(readFileSync(path.join(DIR, file), "utf8")) as { records?: unknown };
    if (!Array.isArray(data.records)) throw new Error(`Daily message library — ${file}: "records" must be an array`);
    data.records.forEach((raw, i) => {
      const rec = validate(raw, `${file} #${i + 1}`);
      const dup = seen.get(rec.message_id);
      if (dup) throw new Error(`Daily message library — ${rec.message_id} appears in both ${dup} and ${file}`);
      seen.set(rec.message_id, file);
      if (!(CATEGORIES as readonly string[]).includes(rec.category))
        console.warn(`[daily messages] ${rec.message_id}: category "${rec.category}" is not in the guidelines list`);
      records.push(rec);
    });
  }
  cache = records.sort((a, b) => a.publish_date.localeCompare(b.publish_date));
  return cache;
}

/**
 * Records the site may show: status approved or published.
 * DAILY_MESSAGES_PREVIEW_DRAFTS=1 also shows drafts — for local review
 * only (npm run dev); never set it for a build that is deployed.
 */
export function getPublicMessages(): PublicMessage[] {
  const withDrafts = process.env.DAILY_MESSAGES_PREVIEW_DRAFTS === "1";
  return loadLibrary()
    .filter((r) => withDrafts || PUBLISHABLE.has(r.status))
    .map((r) => ({
      id: r.message_id,
      date: r.publish_date,
      contentType: r.content_type,
      category: r.category,
      title: r.title,
      message: r.message,
      closingLine: r.closing_line,
      mood: r.mood,
      relatedEpisodeId: r.related_episode_id,
      specialDay: r.special_day,
    }));
}
