import Link from "next/link";
import { Film } from "lucide-react";
import { VideoCard } from "@/components/postcard/video-card";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import type { Category } from "@/types/category";
import type { Mood } from "@/types/mood";
import type { Video } from "@/types/video";
import { routes } from "@/lib/routes";

interface HomeFilmsProps {
  videos: Video[];
  categories: Category[];
  moods: Mood[];
}

/**
 * Home: the whole "Thước phim" area in one block — three newest films
 * (a swipeable row on phones) and a row of moods to start from.
 */
export function HomeFilms({ videos, categories, moods }: HomeFilmsProps) {
  const labels = new Map(categories.map((c) => [c.id, c.label]));

  return (
    <section aria-labelledby="home-films" className="border-t border-border bg-surface py-14 md:py-20">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-2 text-accent">
              <Film aria-hidden className="size-3.5" strokeWidth={1.75} />
              Thước phim
            </p>
            <h2 id="home-films" className="mt-3 font-display text-display-md font-medium md:text-display-lg">
              Những thước phim ngắn.
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-pretty text-muted">
              Vài chục giây thiên nhiên, tiếng nước và ánh sáng — để dừng lại giữa ngày.
            </p>
          </div>
          <ArrowLink href={routes.library()} className="shrink-0">
            Xem tất cả thước phim
          </ArrowLink>
        </div>
      </Container>

      {/* Phones: swipeable row that bleeds to the edge. md+: three-column grid. */}
      <Container className="max-md:px-0">
        <ul className="mt-10 flex snap-x snap-mandatory scroll-px-(--gutter) gap-4 overflow-x-auto px-(--gutter) pb-2 scrollbar-none md:grid md:snap-none md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-8">
          {videos.slice(0, 3).map((video) => (
            <li key={video.id} className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto">
              <VideoCard
                video={video}
                categoryLabel={labels.get(video.categoryId) ?? ""}
                sizes="(min-width: 1376px) 405px, (min-width: 768px) 31vw, 78vw"
              />
            </li>
          ))}
        </ul>
      </Container>

      <Container>
        <nav aria-labelledby="home-moods" className="mt-10 flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:items-center md:gap-6">
          <h3 id="home-moods" className="shrink-0 text-sm text-muted">
            Hôm nay bạn cảm thấy thế nào?
          </h3>
          <ul className="-mx-(--gutter) flex gap-2 overflow-x-auto px-(--gutter) pb-1 scrollbar-none md:mx-0 md:flex-wrap md:px-0 md:pb-0">
            {moods.map((mood) => (
              <li key={mood.id}>
                <Link
                  href={routes.library({ moods: [mood.slug] })}
                  className="inline-flex h-11 items-center rounded-sm border border-border px-4 font-display text-lg whitespace-nowrap text-foreground transition-colors duration-300 hover:border-foreground/40 hover:text-accent"
                >
                  {mood.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
