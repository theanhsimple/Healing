"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Check, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { asset } from "@/lib/asset";
import { formatMessageDate, vietnamDateKey } from "@/lib/daily-messages/date";
import type { PublicMessage } from "@/lib/daily-messages/library";

// The date is read in the browser: the site is prerendered, so the
// server can't know "today". Before hydration a quiet placeholder of
// the same height is shown.
const subscribe = () => () => {};
const getDateKey = () => vietnamDateKey();
const getServerDateKey = () => null;

// If one date ever holds more than one publishable record, show the most specific.
const PRIORITY: Record<PublicMessage["contentType"], number> = { special_day: 0, episode_message: 1, daily_message: 2 };

// Batch 01 closing lines are English, later batches Vietnamese: mark the
// English ones so screen readers switch voice.
const VIETNAMESE = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

function messageFor(messages: PublicMessage[], dateKey: string) {
  return messages.filter((m) => m.date === dateKey).sort((a, b) => PRIORITY[a.contentType] - PRIORITY[b.contentType])[0];
}

/**
 * "Thông điệp hôm nay": the library record whose publish_date is today
 * (Vietnam time), loaded from public/daily-messages/<date>.json — written
 * at build time with approved/published records and reader-facing fields
 * only (scripts/build-daily-messages.mjs). No file for today → hidden.
 */
export function DailyMessage() {
  const dateKey = useSyncExternalStore(subscribe, getDateKey, getServerDateKey);
  const [copied, setCopied] = useState(false);
  // undefined = loading, null = nothing for today
  const [loaded, setLoaded] = useState<{ date: string; message: PublicMessage | null }>();
  const message = loaded && loaded.date === dateKey ? loaded.message : undefined;

  useEffect(() => {
    if (!dateKey) return;
    let cancelled = false;
    fetch(asset(`/daily-messages/${dateKey}.json`))
      .then((r) => (r.ok ? (r.json() as Promise<PublicMessage[]>) : []))
      .catch(() => [] as PublicMessage[])
      .then((list) => {
        if (!cancelled) setLoaded({ date: dateKey, message: messageFor(list, dateKey) ?? null });
      });
    return () => {
      cancelled = true;
    };
  }, [dateKey]);

  if (message === null) return null;

  async function share() {
    if (!message) return;
    const parts = [message.title, message.message, message.closingLine].filter(Boolean);
    const text = `${parts.join("\n\n")}\n\n— Thông điệp hôm nay từ Little Postcard`;
    const url = window.location.origin + window.location.pathname;
    try {
      if (navigator.share) {
        await navigator.share({ text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // share sheet dismissed or clipboard blocked: nothing to do
    }
  }

  return (
    <section aria-labelledby="daily-message" className="border-b border-border">
      <Container className="flex flex-col items-center py-14 text-center md:py-16">
        <h2 id="daily-message" className="eyebrow text-accent">
          Thông điệp hôm nay
        </h2>
        <p className="mt-2 min-h-5 text-xs text-muted">{dateKey ? formatMessageDate(dateKey) : " "}</p>

        <figure aria-live="polite" className="mt-7 flex min-h-[17.5rem] w-full max-w-2xl flex-col items-center sm:min-h-[12.5rem]">
          {message ? (
            <div className="animate-page-in" data-message-id={message.id}>
              <figcaption className="font-display text-display-sm font-medium italic text-accent">
                {message.title}
              </figcaption>
              <blockquote className="mt-4">
                <p className="font-display text-[1.3125rem] leading-[1.6] text-pretty text-foreground md:text-[1.4375rem]">
                  {message.message}
                </p>
                {message.closingLine ? (
                  <p lang={VIETNAMESE.test(message.closingLine) ? undefined : "en"} data-closing className="mt-5 font-display text-lg italic text-muted">
                    {message.closingLine}
                  </p>
                ) : null}
              </blockquote>
            </div>
          ) : (
            <div aria-hidden className="flex w-full flex-col items-center gap-3">
              <span className="block h-6 w-48 bg-surface-secondary motion-safe:animate-pulse" />
              <span className="block h-5 w-full max-w-xl bg-surface-secondary motion-safe:animate-pulse" />
              <span className="block h-5 w-5/6 max-w-lg bg-surface-secondary motion-safe:animate-pulse" />
            </div>
          )}
        </figure>

        <button
          type="button"
          onClick={share}
          disabled={!message}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm px-3 text-sm text-muted transition-colors hover:bg-surface-secondary hover:text-foreground disabled:opacity-0"
        >
          {copied ? (
            <>
              <Check aria-hidden className="size-4 text-accent" strokeWidth={1.75} />
              Đã sao chép
            </>
          ) : (
            <>
              <Send aria-hidden className="size-4" strokeWidth={1.5} />
              Gửi thông điệp này cho ai đó
            </>
          )}
        </button>
      </Container>
    </section>
  );
}
