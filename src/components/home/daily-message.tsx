"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Dialog } from "radix-ui";
import { Check, MailOpen, Send, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { asset } from "@/lib/asset";
import { formatMessageDate, vietnamDateKey } from "@/lib/daily-messages/date";
import type { PublicMessage } from "@/lib/daily-messages/library";
import { CategoryIcon, PostcardStamp, Postmark } from "./postcard-stamp";

// The date is read in the browser: the site is prerendered, so the
// server can't know "today".
const subscribe = () => () => {};
const getDateKey = () => vietnamDateKey();
const getServerDateKey = () => null;

// If one date ever holds more than one publishable record, show the most specific.
const PRIORITY: Record<PublicMessage["contentType"], number> = { special_day: 0, episode_message: 1, daily_message: 2 };

// Batch 01 closing lines are English, later batches Vietnamese: mark the
// English ones so screen readers switch voice.
const VIETNAMESE = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

const OPEN_DELAY_MS = 520;

function messageFor(messages: PublicMessage[], dateKey: string) {
  return messages.filter((m) => m.date === dateKey).sort((a, b) => PRIORITY[a.contentType] - PRIORITY[b.contentType])[0];
}

function readOpened(dateKey: string) {
  try {
    return window.localStorage.getItem("lp-letter-opened") === dateKey;
  } catch {
    return false;
  }
}
function storeOpened(dateKey: string) {
  try {
    window.localStorage.setItem("lp-letter-opened", dateKey);
  } catch {
    // private mode or storage blocked: the envelope simply looks sealed again next visit
  }
}

/**
 * "Thông điệp hôm nay" as a sealed envelope. Opening it (envelope or
 * button) lifts the flap and the day's letter opens in a dialog.
 * Content comes from public/daily-messages/<date>.json — approved records,
 * reader-facing fields only. No file for today → the section is hidden.
 */
export function DailyMessage() {
  const dateKey = useSyncExternalStore(subscribe, getDateKey, getServerDateKey);
  const [loaded, setLoaded] = useState<{ date: string; message: PublicMessage | null }>();
  const [opening, setOpening] = useState(false);
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const message = loaded && loaded.date === dateKey ? loaded.message : undefined;

  useEffect(() => {
    if (!dateKey) return;
    let cancelled = false;
    fetch(asset(`/daily-messages/${dateKey}.json`))
      .then((r) => (r.ok ? (r.json() as Promise<PublicMessage[]>) : []))
      .catch(() => [] as PublicMessage[])
      .then((list) => {
        if (cancelled) return;
        setLoaded({ date: dateKey, message: messageFor(list, dateKey) ?? null });
        setOpened(readOpened(dateKey));
      });
    return () => {
      cancelled = true;
    };
  }, [dateKey]);

  if (message === null) return null;

  function openLetter() {
    if (!message || !dateKey || opening) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOpening(true);
    setTimeout(
      () => {
        setOpen(true);
        setOpened(true);
        storeOpened(dateKey);
      },
      reduce ? 0 : OPEN_DELAY_MS,
    );
  }

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

  const [year, month, day] = (dateKey ?? "----").split("-");
  const ready = Boolean(message);

  return (
    <section aria-labelledby="daily-message" className="overflow-hidden border-b border-border bg-surface-secondary/60">
      <Container className="flex flex-col items-center py-14 text-center md:py-20">
        <h2 id="daily-message" className="eyebrow text-accent">
          Thông điệp hôm nay
        </h2>
        <p className="mt-2 min-h-5 text-xs text-muted">{dateKey ? formatMessageDate(dateKey) : " "}</p>

        {/* The envelope: one big button */}
        <button
          type="button"
          onClick={openLetter}
          disabled={!ready}
          aria-label={opened ? "Mở lại lá thư hôm nay" : "Mở lá thư hôm nay"}
          data-state={opening ? "opening" : "sealed"}
          className="envelope group mt-9 w-full max-w-[26rem] cursor-pointer disabled:cursor-default"
        >
          <span className="envelope-body">
            <span aria-hidden className="envelope-letter" />
            <span aria-hidden className="envelope-folds" />
            <span aria-hidden className="envelope-flap" />
            <span aria-hidden className="envelope-seal">
              {message ? <CategoryIcon category={message.category} className="size-5" /> : null}
            </span>
            <span aria-hidden className="absolute right-4 bottom-3 left-3 z-[5] flex items-end justify-between">
              {dateKey ? <Postmark day={day} month={month} year={year} className="w-24 opacity-55 -rotate-[7deg]" /> : <span />}
              <span className="font-display text-lg italic text-muted">Gửi bạn</span>
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={openLetter}
          disabled={!ready}
          className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-sm bg-foreground px-6 text-sm font-medium text-background transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-foreground/90 disabled:opacity-40"
        >
          <MailOpen aria-hidden className="size-4" strokeWidth={1.75} />
          {opened ? "Đọc lại thông điệp" : "Đón nhận thông điệp"}
        </button>
        <p className="mt-3 text-xs text-muted">
          {opened ? "Bạn đã mở lá thư hôm nay." : "Mỗi ngày một lá thư nhỏ, chỉ dành cho hôm nay."}
        </p>

        <Dialog.Root
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) setOpening(false);
          }}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-media/45 backdrop-blur-[2px] data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
            <Dialog.Content
              aria-describedby={undefined}
              className="letter-dialog postcard fixed top-1/2 left-1/2 z-50 max-h-[88dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto p-6 pt-12 text-left outline-none sm:p-10 sm:pt-10"
            >
              {message ? (
                <article data-message-id={message.id}>
                  <div aria-hidden className="pointer-events-none float-right -mt-6 -mr-2 ml-4 sm:-mt-4 sm:-mr-4">
                    <PostcardStamp category={message.category} number={day} className="rotate-[3deg] max-sm:scale-90" />
                  </div>
                  <p className="eyebrow text-accent">{formatMessageDate(message.date)}</p>
                  <Dialog.Title className="mt-3 font-display text-display-sm font-medium italic text-accent">
                    {message.title}
                  </Dialog.Title>
                  <p className="mt-5 font-display text-[1.25rem] leading-[1.7] text-pretty text-foreground md:text-[1.375rem]">
                    {message.message}
                  </p>
                  {message.closingLine ? (
                    <p
                      lang={VIETNAMESE.test(message.closingLine) ? undefined : "en"}
                      data-closing
                      className="mt-5 font-display text-lg italic text-muted"
                    >
                      {message.closingLine}
                    </p>
                  ) : null}
                  <p className="mt-7 font-display text-base italic text-muted">— Little Postcard</p>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-accent/30 pt-5">
                    <button
                      type="button"
                      onClick={share}
                      className="inline-flex min-h-11 items-center gap-2 rounded-sm px-3 text-sm text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
                    >
                      {copied ? (
                        <>
                          <Check aria-hidden className="size-4 text-accent" strokeWidth={1.75} />
                          Đã sao chép
                        </>
                      ) : (
                        <>
                          <Send aria-hidden className="size-4" strokeWidth={1.5} />
                          Gửi lá thư này cho ai đó
                        </>
                      )}
                    </button>
                    <Dialog.Close className="inline-flex min-h-11 items-center rounded-sm border border-border px-4 text-sm text-foreground transition-colors hover:bg-surface-secondary">
                      Cất lá thư
                    </Dialog.Close>
                  </div>
                </article>
              ) : null}
              <Dialog.Close
                aria-label="Đóng"
                className="absolute top-2 left-2 inline-flex size-11 items-center justify-center rounded-sm text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
              >
                <X aria-hidden className="size-4" />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Container>
    </section>
  );
}
