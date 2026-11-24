import Image from "next/image";
import { cn } from "cn";
import type { PodcastEpisode } from "@/data/podcast";

interface EpisodePosterProps {
  episode: PodcastEpisode;
  sizes: string;
  preload?: boolean;
  className?: string;
}

/** Episode artwork at its native 3:4, or a typographic stand-in. */
export function EpisodePoster({ episode, sizes, preload, className }: EpisodePosterProps) {
  return (
    <div className={cn("relative aspect-[3/4] overflow-hidden bg-media", className)}>
      {episode.poster ? (
        <Image
          src={episode.poster.src}
          alt={episode.poster.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      ) : (
        <div className="flex h-full flex-col justify-between p-6 text-[#f7f7f4]">
          <p className="eyebrow text-[#f7f7f4]/60">The Little Postcard Project</p>
          <p className="font-display text-6xl italic">{String(episode.number).padStart(2, "0")}</p>
        </div>
      )}
    </div>
  );
}
