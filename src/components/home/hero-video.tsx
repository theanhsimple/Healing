"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient hero loop. The poster image is shown first and stays for anyone
 * who prefers reduced motion or saves data; the video fades in only once
 * it can play through, so there is never a black flash.
 */
export function HeroVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    video.src = src;
    video.play().catch(() => {});
  }, [src]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export; poster doubles as LCP image */}
      <img src={poster} alt="" fetchPriority="high" className={className} />
      <video
        ref={ref}
        aria-hidden
        muted
        loop
        playsInline
        preload="none"
        onCanPlayThrough={() => setReady(true)}
        className={`${className ?? ""} transition-opacity duration-[1200ms] ease-out ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}
