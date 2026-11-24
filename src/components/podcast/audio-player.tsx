"use client";

import { useEffect, useRef, useState } from "react";
import { Download, LoaderCircle, Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { cn } from "cn";
import { formatDuration, formatDurationLong } from "@/lib/format";

interface AudioPlayerProps {
  src: string;
  title: string;
  /** Shown before the file's own metadata has loaded. */
  durationSeconds: number;
  /** Artwork for the lock screen / media notification. */
  artwork?: string;
  album?: string;
  downloadName?: string;
  className?: string;
}

const RATES = [1, 1.25, 1.5, 0.75] as const;

/**
 * Podcast player. Every state shown comes from the media element's own
 * events. The site's background music steps aside automatically while
 * this plays (see BackgroundMusic).
 */
export function AudioPlayer({
  src,
  title,
  durationSeconds,
  artwork,
  album,
  downloadName,
  className,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(durationSeconds);
  const [buffered, setBuffered] = useState(0);
  const [rate, setRate] = useState<(typeof RATES)[number]>(1);

  // Lock-screen / notification controls on phones.
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const audio = audioRef.current;
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist: "Những điều nhỏ bé",
      album: album ?? "The Little Postcard Project",
      artwork: artwork ? [{ src: new URL(artwork, location.href).href, sizes: "600x800", type: "image/jpeg" }] : [],
    });
    const seekBy = (delta: number) => () => {
      if (audio) audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + delta));
    };
    navigator.mediaSession.setActionHandler("seekbackward", seekBy(-15));
    navigator.mediaSession.setActionHandler("seekforward", seekBy(15));
    return () => {
      navigator.mediaSession.setActionHandler("seekbackward", null);
      navigator.mediaSession.setActionHandler("seekforward", null);
    };
  }, [title, album, artwork]);

  const audio = () => audioRef.current;

  function toggle() {
    const el = audio();
    if (!el) return;
    if (el.paused) {
      setError(false);
      // A failed source stays failed until it is reloaded.
      if (el.error) el.load();
      if (el.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) setWaiting(true);
      el.play().catch((reason: unknown) => {
        // NotAllowedError (autoplay policy) needs no message; anything else is a real failure.
        if (reason instanceof DOMException && reason.name !== "NotAllowedError" && reason.name !== "AbortError") {
          setError(true);
          setWaiting(false);
        }
      });
    } else {
      el.pause();
    }
  }

  function seekTo(seconds: number) {
    const el = audio();
    if (!el || !Number.isFinite(seconds)) return;
    el.currentTime = Math.max(0, Math.min(seconds, el.duration || duration));
    setCurrent(el.currentTime);
  }

  function cycleRate() {
    const next = RATES[(RATES.indexOf(rate) + 1) % RATES.length];
    setRate(next);
    if (audio()) audio()!.playbackRate = next;
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div className={cn("border border-border bg-surface p-5 md:p-6", className)}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onCanPlay={() => setWaiting(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onDurationChange={(e) => {
          const d = e.currentTarget.duration;
          if (Number.isFinite(d) && d > 0) setDuration(d);
        }}
        onProgress={(e) => {
          const r = e.currentTarget.buffered;
          if (r.length) setBuffered(r.end(r.length - 1));
        }}
        onError={() => {
          setError(true);
          setWaiting(false);
          setPlaying(false);
        }}
      />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Tạm dừng" : `Phát “${title}”`}
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-foreground text-surface transition-transform duration-300 ease-soft hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
        >
          {waiting ? (
            <LoaderCircle aria-hidden className="size-6 animate-spin" strokeWidth={1.5} />
          ) : playing ? (
            <Pause aria-hidden className="size-6 fill-current" strokeWidth={1} />
          ) : (
            <Play aria-hidden className="ml-0.5 size-6 fill-current" strokeWidth={1} />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-accent">Nghe tập này</p>
          <p className="mt-1 line-clamp-2 font-display text-xl leading-tight [font-variant-numeric:lining-nums]">{title}</p>
        </div>
      </div>

      <input
        type="range"
        aria-label="Tiến trình"
        aria-valuetext={`${formatDurationLong(Math.floor(current))} trên ${formatDurationLong(Math.floor(duration))}`}
        min={0}
        max={duration || 0}
        step={0.1}
        value={Math.min(current, duration || 0)}
        onChange={(e) => seekTo(Number(e.target.value))}
        style={{ "--fill": `${progress}%`, "--buffer": `${bufferedPct}%` } as React.CSSProperties}
        className="audio-range mt-4 block w-full"
      />

      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted tabular-nums">
          <span aria-hidden>
            {formatDuration(current)} <span className="text-muted-foreground">/ {formatDuration(duration)}</span>
          </span>
        </p>
        <div className="flex items-center">
          <PlayerButton label="Lùi 15 giây" onClick={() => seekTo((audio()?.currentTime ?? 0) - 15)}>
            <RotateCcw aria-hidden className="size-4" strokeWidth={1.5} />
            <span aria-hidden className="text-[0.625rem] tabular-nums">15</span>
          </PlayerButton>
          <PlayerButton label="Tới 15 giây" onClick={() => seekTo((audio()?.currentTime ?? 0) + 15)}>
            <span aria-hidden className="text-[0.625rem] tabular-nums">15</span>
            <RotateCw aria-hidden className="size-4" strokeWidth={1.5} />
          </PlayerButton>
          <PlayerButton label={`Tốc độ phát ${rate}×, bấm để đổi`} onClick={cycleRate}>
            <span aria-hidden className="w-9 text-xs tabular-nums">{rate}×</span>
          </PlayerButton>
          <a
            href={src}
            download={downloadName}
            aria-label="Tải bản audio về máy"
            title="Tải về"
            className="inline-flex size-11 items-center justify-center rounded-sm text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
          >
            <Download aria-hidden className="size-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-3 flex items-center gap-3 text-sm text-destructive">
          Không phát được bản audio.
          <button type="button" onClick={toggle} className="underline underline-offset-4">
            Thử lại
          </button>
        </p>
      ) : null}
    </div>
  );
}

function PlayerButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex h-11 min-w-11 items-center justify-center gap-0.5 rounded-sm px-1 text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
    >
      {children}
    </button>
  );
}
