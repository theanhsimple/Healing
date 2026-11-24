import Link from "next/link";
import { ArrowRight, Headphones } from "lucide-react";
import { EpisodePoster } from "@/components/podcast/episode-poster";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { formatAirDate, podcastEpisodes, podcastSeries, type PodcastEpisode } from "@/data/podcast";
import { routes } from "@/lib/routes";

/** Home: the podcast's latest episode — compact, one screen tall at most. */
export function PodcastSpotlight({ episode }: { episode: PodcastEpisode }) {
  const number = String(episode.number).padStart(2, "0");
  const next = podcastEpisodes.find((e) => e.number === episode.number + 1);
  const href = `${routes.podcastEpisode(episode.slug)}${episode.audio ? "#nghe" : ""}`;

  return (
    <section aria-labelledby="podcast-spotlight" className="py-14 md:py-20">
      <Container className="grid grid-cols-[7rem_1fr] items-start gap-x-5 gap-y-6 sm:grid-cols-[11rem_1fr] md:grid-cols-[15rem_1fr] md:items-center md:gap-x-10 lg:grid-cols-[19rem_1fr] lg:gap-x-16">
        <Link href={href} tabIndex={-1} aria-hidden className="block">
          <EpisodePoster
            episode={episode}
            sizes="(min-width: 1024px) 304px, (min-width: 768px) 240px, (min-width: 640px) 176px, 112px"
            className="transition-transform duration-700 ease-soft hover:scale-[1.015]"
          />
        </Link>

        <div className="min-w-0">
          <p className="eyebrow flex items-center gap-2 text-accent">
            <Headphones aria-hidden className="size-3.5" strokeWidth={1.75} />
            <span>
              Podcast<span className="hidden sm:inline"> · {podcastSeries.title}</span>
            </span>
          </p>
          <h2
            id="podcast-spotlight"
            className="mt-3 font-display text-display-md font-medium text-balance md:text-display-lg"
          >
            <span className="block text-base font-normal not-italic text-muted md:text-lg">
              Tập {number}
            </span>
            {episode.title}
          </h2>
          <p className="mt-3 text-sm text-muted">
            {formatAirDate(episode.airDate)} · {episode.durationLabel}
          </p>
          {episode.tagline ? (
            <p className="mt-4 hidden max-w-lg leading-relaxed text-pretty text-foreground/80 sm:block">
              {episode.tagline}
            </p>
          ) : null}
        </div>

        <div className="col-span-2 flex flex-col gap-4 md:col-span-1 md:col-start-2 md:-mt-2">
          {episode.tagline ? (
            <p className="text-[0.9375rem] leading-relaxed text-pretty text-foreground/80 sm:hidden">
              {episode.tagline}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Button asChild size="lg">
              <Link href={href}>
                {episode.audio ? <Headphones aria-hidden /> : null}
                {episode.audio ? `Nghe tập ${number}` : "Đọc tấm bưu thiếp"}
                {episode.audio ? null : <ArrowRight aria-hidden />}
              </Link>
            </Button>
            <ArrowLink href={routes.podcast}>Lịch phát sóng</ArrowLink>
          </div>
          {next ? (
            <p className="text-sm text-muted">
              Tập tiếp theo · {formatAirDate(next.airDate)}:{" "}
              <span className="text-foreground">{next.title}</span>
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
