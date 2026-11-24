"use client";

import { useEffect, useRef, useState } from "react";
import { Music } from "lucide-react";
import { asset } from "@/lib/asset";

const STORAGE_KEY = "lp-music"; // "off" once the visitor turns music off
const VOLUME = 0.35;
const FADE_MS = 900;

function isOff() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "off";
  } catch {
    return false;
  }
}

function remember(on: boolean) {
  try {
    if (on) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, "off");
  } catch {
    // storage blocked: the choice still applies to this visit
  }
}

/**
 * Site-wide background music ("Four-Note Motif"), looping.
 *
 * Browsers block audible autoplay, so music starts on the visitor's first
 * click / tap / key press anywhere — unless they turned it off before.
 * It fades out while any other media (a postcard video) plays and fades
 * back in afterwards. Lives in the root layout, so it keeps playing
 * across page navigation.
 */
export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fadeFrame = useRef(0);
  const wanted = useRef(true);
  const yieldedToMedia = useRef(false);
  const [playing, setPlaying] = useState(false);

  function fadeTo(target: number, then?: () => void) {
    const audio = audioRef.current;
    if (!audio) return;
    cancelAnimationFrame(fadeFrame.current);
    const from = audio.volume;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / FADE_MS);
      // clamp: float error can land just outside [0, 1], which throws
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * t));
      if (t < 1) fadeFrame.current = requestAnimationFrame(step);
      else then?.();
    };
    fadeFrame.current = requestAnimationFrame(step);
  }

  function fadeIn() {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve(false);
    if (audio.paused) audio.volume = 0;
    return audio
      .play()
      .then(() => {
        fadeTo(VOLUME);
        return true;
      })
      .catch(() => false); // still blocked: wait for the next interaction
  }

  function fadeOut() {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    fadeTo(0, () => audio.pause());
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    wanted.current = !isOff();

    const otherMediaPlaying = () =>
      [...document.querySelectorAll<HTMLMediaElement>("video, audio")].some(
        (m) => m !== audio && !m.paused && !m.ended,
      );

    // First interaction starts the music (the toggle handles its own click).
    const triggers = ["click", "keydown", "touchend"] as const;
    const onFirstInteraction = (event: Event) => {
      if (!wanted.current) return detach();
      if (buttonRef.current?.contains(event.target as Node)) return;
      if (otherMediaPlaying()) return;
      void fadeIn().then((started) => started && detach());
    };
    const detach = () =>
      triggers.forEach((t) => document.removeEventListener(t, onFirstInteraction, true));
    if (wanted.current) {
      triggers.forEach((t) => document.addEventListener(t, onFirstInteraction, true));
    }

    // Step aside for videos (media events don't bubble, so listen in capture).
    const onMediaPlay = (event: Event) => {
      if (event.target === audio || !(event.target instanceof HTMLMediaElement)) return;
      if (!audio.paused) {
        yieldedToMedia.current = true;
        fadeOut();
      }
    };
    const onMediaStop = (event: Event) => {
      if (event.target === audio || !(event.target instanceof HTMLMediaElement)) return;
      if (yieldedToMedia.current && wanted.current && !otherMediaPlaying()) {
        yieldedToMedia.current = false;
        void fadeIn();
      }
    };
    document.addEventListener("play", onMediaPlay, true);
    document.addEventListener("pause", onMediaStop, true);
    document.addEventListener("ended", onMediaStop, true);

    const frame = fadeFrame;
    return () => {
      detach();
      document.removeEventListener("play", onMediaPlay, true);
      document.removeEventListener("pause", onMediaStop, true);
      document.removeEventListener("ended", onMediaStop, true);
      cancelAnimationFrame(frame.current);
    };
    // fadeIn / fadeOut only touch refs; running once is intended.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      wanted.current = false;
      yieldedToMedia.current = false;
      remember(false);
      fadeOut();
    } else {
      wanted.current = true;
      remember(true);
      void fadeIn();
    }
  }

  const label = playing ? "Tắt nhạc nền" : "Bật nhạc nền";

  return (
    <>
      <audio
        ref={audioRef}
        src={asset("/audio/four-note-motif.mp3")}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={label}
        title={playing ? "Nhạc nền: Four-Note Motif — bấm để tắt" : "Bật nhạc nền"}
        className="inline-flex size-11 items-center justify-center rounded-sm text-foreground transition-colors duration-300 hover:bg-surface-secondary hover:text-accent"
      >
        {playing ? (
          <span aria-hidden className="flex h-4 items-end gap-[3px]">
            {[0.55, 1, 0.75, 0.4].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h * 100}%`, animationDelay: `${i * -0.27}s` }}
                className="w-[2px] origin-bottom rounded-full bg-current motion-safe:animate-[eq_1.1s_ease-in-out_infinite_alternate]"
              />
            ))}
          </span>
        ) : (
          <Music aria-hidden className="size-[1.125rem]" strokeWidth={1.5} />
        )}
      </button>
    </>
  );
}
