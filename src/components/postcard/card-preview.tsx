"use client";

import { useEffect, useRef } from "react";

/**
 * Muted preview that plays while the pointer rests on the card (mouse and
 * pen only, never on touch), fading in over the thumbnail. Nothing loads
 * until the first hover. Skipped for visitors who prefer reduced motion.
 */
export function CardPreview({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const card = video?.closest("article");
    if (!video || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      timer = setTimeout(() => {
        if (!video.src) video.src = src;
        video.play().then(() => video.classList.add("opacity-100")).catch(() => {});
      }, 180);
    };
    const leave = () => {
      clearTimeout(timer);
      video.classList.remove("opacity-100");
      video.pause();
    };
    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerleave", leave);
    return () => {
      clearTimeout(timer);
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerleave", leave);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700"
    />
  );
}
