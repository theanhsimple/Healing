"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { formatMessageDate, messageForDate, vietnamDateKey } from "@/data/daily-messages";

// The date is read in the browser: the site is prerendered, so the
// server can't know "today". Before hydration a quiet placeholder of
// the same height is shown.
const subscribe = () => () => {};
const getDateKey = () => vietnamDateKey();
const getServerDateKey = () => null;

export function DailyMessage() {
  const dateKey = useSyncExternalStore(subscribe, getDateKey, getServerDateKey);
  const [copied, setCopied] = useState(false);
  const message = dateKey ? messageForDate(dateKey) : null;

  async function share() {
    if (!message) return;
    const text = `“${message.text}” — Thông điệp hôm nay từ Little Postcard`;
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

        <blockquote
          aria-live="polite"
          className="mt-6 flex min-h-[4.5rem] max-w-3xl items-center justify-center md:min-h-[5.5rem]"
        >
          {message ? (
            <p className="animate-page-in font-display text-display-md italic text-balance">“{message.text}”</p>
          ) : (
            <span aria-hidden className="block h-8 w-64 max-w-full bg-surface-secondary motion-safe:animate-pulse" />
          )}
        </blockquote>
        {message?.from ? <p className="mt-3 text-xs text-muted">— {message.from}</p> : null}

        <button
          type="button"
          onClick={share}
          disabled={!message}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm px-3 text-sm text-muted transition-colors hover:bg-surface-secondary hover:text-foreground disabled:opacity-0"
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
