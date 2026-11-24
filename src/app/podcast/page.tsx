import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Headphones } from "lucide-react";
import { EpisodePoster } from "@/components/podcast/episode-poster";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  episodesByWeek,
  formatAirDate,
  formatAirDateShort,
  podcastSeries,
  publishedEpisodes,
} from "@/data/podcast";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: `Podcast · ${podcastSeries.title}`,
  description: podcastSeries.description,
  openGraph: {
    images: publishedEpisodes[0]?.poster ? [publishedEpisodes[0].poster.src] : undefined,
  },
};

export default function PodcastPage() {
  const latest = publishedEpisodes[publishedEpisodes.length - 1];

  return (
    <>
      {/* Series opening */}
      <Container className="editorial-grid gap-y-8 pt-14 pb-14 md:pt-20 md:pb-20 lg:pt-24">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <p className="eyebrow flex items-center gap-2 text-accent">
            <Headphones aria-hidden className="size-3.5" strokeWidth={1.75} />
            Podcast
          </p>
          <h1 className="mt-4 font-display text-display-xl font-medium text-balance">
            {podcastSeries.title}
          </h1>
          <p className="eyebrow mt-4 text-muted">{podcastSeries.englishTitle}</p>
          <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-foreground/80">
            {podcastSeries.description}
          </p>
        </div>
        <dl className="col-span-4 grid grid-cols-1 gap-5 self-end border-t border-border pt-6 text-sm md:col-span-8 md:grid-cols-3 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
          <div>
            <dt className="eyebrow text-muted">Lịch phát sóng</dt>
            <dd className="mt-1.5">{podcastSeries.schedule}</dd>
          </div>
          <div>
            <dt className="eyebrow text-muted">Mùa đầu tiên</dt>
            <dd className="mt-1.5">{podcastSeries.run}</dd>
          </div>
          <div>
            <dt className="eyebrow text-muted">Thời lượng</dt>
            <dd className="mt-1.5">{podcastSeries.episodeLength}</dd>
          </div>
        </dl>
      </Container>

      {/* Latest episode */}
      {latest ? (
        <section aria-labelledby="latest-episode" className="border-t border-border bg-surface py-16 md:py-24">
          <Container className="editorial-grid items-center gap-y-10">
            <Link
              href={routes.podcastEpisode(latest.slug)}
              tabIndex={-1}
              aria-hidden
              className="col-span-4 md:col-span-4 lg:col-span-5"
            >
              <EpisodePoster
                episode={latest}
                preload
                sizes="(min-width: 1376px) 507px, (min-width: 1024px) 38vw, (min-width: 768px) 48vw, 100vw"
                className="transition-transform duration-700 ease-soft hover:scale-[1.01]"
              />
            </Link>
            <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7">
              <p className="eyebrow text-accent">
                Tập {String(latest.number).padStart(2, "0")} · Mới nhất
              </p>
              <h2
                id="latest-episode"
                className="mt-4 font-display text-display-lg font-medium text-balance"
              >
                {latest.title}
              </h2>
              {latest.tagline ? (
                <p className="mt-5 max-w-md leading-relaxed text-pretty text-foreground/80">
                  {latest.tagline}
                </p>
              ) : null}
              <p className="mt-5 text-sm text-muted">
                {formatAirDate(latest.airDate)} · {latest.durationLabel}
              </p>
              {latest.keyMessage ? (
                <blockquote className="mt-8 border-l border-accent/60 pl-5 font-display text-xl leading-snug italic text-foreground">
                  “{latest.keyMessage}”
                </blockquote>
              ) : null}
              <Button asChild size="lg" className="mt-10">
                <Link href={`${routes.podcastEpisode(latest.slug)}${latest.audio ? "#nghe" : ""}`}>
                  {latest.audio ? <Headphones aria-hidden /> : null}
                  {latest.audio
                    ? `Nghe tập ${String(latest.number).padStart(2, "0")}`
                    : "Đọc tấm bưu thiếp"}
                  {latest.audio ? null : <ArrowRight aria-hidden />}
                </Link>
              </Button>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Season schedule */}
      <section aria-labelledby="schedule-title" className="border-t border-border py-16 md:py-24 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow text-muted">Mùa 1</p>
            <h2 id="schedule-title" className="mt-4 font-display text-display-lg font-medium">
              Lịch phát sóng
            </h2>
            <p className="mt-4 text-muted">
              Mười hai tấm bưu thiếp trong bốn tuần — vào thứ Ba, thứ Năm và Chủ Nhật.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-12 md:mt-16">
            {episodesByWeek().map((week) => (
              <div key={week.week} className="editorial-grid gap-y-4">
                <h3 className="col-span-4 md:col-span-2 lg:col-span-3">
                  <span className="eyebrow block text-muted">Tuần {week.week}</span>
                  <span className="mt-1 block text-sm text-foreground">{week.range}</span>
                </h3>
                <ol className="col-span-4 border-t border-border md:col-span-6 lg:col-span-9">
                  {week.episodes.map((episode) => {
                    const published = episode.status === "published";
                    const body = (
                      <>
                        <span className="text-xs text-muted tabular-nums">
                          {String(episode.number).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs text-muted">
                            {formatAirDateShort(episode.airDate)}
                          </span>
                          <span
                            className={
                              published
                                ? "mt-1 block font-display text-display-sm text-foreground transition-colors duration-300 group-hover:text-accent"
                                : "mt-1 block font-display text-display-sm text-foreground/70"
                            }
                          >
                            {episode.title}
                          </span>
                          {episode.tagline && !published ? (
                            <span className="mt-1 block text-sm text-muted">{episode.tagline}</span>
                          ) : null}
                        </span>
                        <span className="self-center">
                          {published ? (
                            <span className="flex items-center gap-2 text-xs text-accent">
                              <span className="hidden sm:inline">Đã phát hành</span>
                              <ArrowRight
                                aria-hidden
                                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                                strokeWidth={1.5}
                              />
                            </span>
                          ) : (
                            <Badge variant="outline" className="whitespace-nowrap">
                              Sắp ra mắt
                            </Badge>
                          )}
                        </span>
                      </>
                    );
                    const rowClass =
                      "grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 py-5 md:grid-cols-[2.5rem_1fr_auto] md:gap-x-6";
                    return (
                      <li key={episode.slug} className="border-b border-border">
                        {published ? (
                          <Link href={routes.podcastEpisode(episode.slug)} className={`group ${rowClass}`}>
                            {body}
                          </Link>
                        ) : (
                          <div className={rowClass}>{body}</div>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
