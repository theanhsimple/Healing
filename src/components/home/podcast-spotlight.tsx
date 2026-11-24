import Link from "next/link";
import { ArrowRight, Headphones } from "lucide-react";
import { EpisodePoster } from "@/components/podcast/episode-poster";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  formatAirDate,
  podcastEpisodes,
  podcastSeries,
  type PodcastEpisode,
} from "@/data/podcast";
import { routes } from "@/lib/routes";

/** Home: the podcast's latest episode and what comes next. */
export function PodcastSpotlight({ episode }: { episode: PodcastEpisode }) {
  const number = String(episode.number).padStart(2, "0");
  const next = podcastEpisodes.find((e) => e.number === episode.number + 1);

  return (
    <section aria-labelledby="podcast-spotlight" className="reveal py-20 md:py-28 lg:py-36">
      <Container className="editorial-grid items-center gap-y-10">
        <Link
          href={routes.podcastEpisode(episode.slug)}
          tabIndex={-1}
          aria-hidden
          className="col-span-4 md:col-span-4 lg:col-span-5"
        >
          <EpisodePoster
            episode={episode}
            sizes="(min-width: 1376px) 507px, (min-width: 1024px) 38vw, (min-width: 768px) 48vw, 100vw"
            className="transition-transform duration-700 ease-soft hover:scale-[1.01]"
          />
        </Link>

        <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7">
          <p className="eyebrow flex items-center gap-2 text-accent">
            <Headphones aria-hidden className="size-3.5" strokeWidth={1.75} />
            Podcast · {podcastSeries.title}
          </p>
          <h2
            id="podcast-spotlight"
            className="mt-4 font-display text-display-lg font-medium text-balance"
          >
            Tấm bưu thiếp tuần này.
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">{podcastSeries.description}</p>

          <div className="mt-10 border-t border-border pt-8">
            <p className="eyebrow text-muted">Tập {number}</p>
            <h3 className="mt-3 font-display text-display-md italic">{episode.title}</h3>
            <p className="mt-3 text-sm text-muted">
              {formatAirDate(episode.airDate)} · {episode.durationLabel}
            </p>
            {episode.tagline ? (
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-pretty text-foreground/80">
                {episode.tagline}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button asChild size="lg">
                <Link href={`${routes.podcastEpisode(episode.slug)}${episode.audio ? "#nghe" : ""}`}>
                  {episode.audio ? <Headphones aria-hidden /> : null}
                  {episode.audio ? `Nghe tập ${number}` : "Đọc tấm bưu thiếp"}
                  {episode.audio ? null : <ArrowRight aria-hidden />}
                </Link>
              </Button>
              <ArrowLink href={routes.podcast}>Lịch phát sóng</ArrowLink>
            </div>
            {next ? (
              <p className="mt-8 text-sm text-muted">
                Tập tiếp theo · {formatAirDate(next.airDate)}:{" "}
                <span className="text-foreground">{next.title}</span>
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
