import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, AudioLines } from "lucide-react";
import { AudioPlayer } from "@/components/podcast/audio-player";
import { EpisodePoster } from "@/components/podcast/episode-poster";
import { Breadcrumb } from "@/components/postcard/breadcrumb";
import { Skeleton } from "@/components/shared/skeleton";
import { Container } from "@/components/ui/container";
import {
  formatAirDate,
  getEpisode,
  podcastEpisodes,
  podcastSeries,
  publishedEpisodes,
} from "@/data/podcast";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return publishedEpisodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/podcast/[slug]">): Promise<Metadata> {
  const episode = getEpisode((await params).slug);
  if (!episode) return { title: "Không tìm thấy" };
  return {
    title: `Tập ${String(episode.number).padStart(2, "0")} · ${episode.title}`,
    description: episode.tagline,
    openGraph: { type: "article", images: episode.poster ? [episode.poster.src] : undefined },
  };
}

export default function EpisodePage({ params }: PageProps<"/podcast/[slug]">) {
  return (
    <Suspense fallback={<EpisodeSkeleton />}>
      <EpisodeView params={params} />
    </Suspense>
  );
}

function EpisodeSkeleton() {
  return (
    <Container role="status" aria-label="Đang tải tập podcast" className="editorial-grid gap-y-8 py-10">
      <Skeleton className="col-span-4 aspect-[3/4] md:col-span-4 lg:col-span-5" />
      <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="mt-5 h-14 w-4/5" />
        <Skeleton className="mt-6 h-4 w-full" />
      </div>
    </Container>
  );
}

async function EpisodeView({ params }: Pick<PageProps<"/podcast/[slug]">, "params">) {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) notFound();

  const number = String(episode.number).padStart(2, "0");
  const next = podcastEpisodes.find((e) => e.number === episode.number + 1);

  return (
    <article>
      <Container className="pt-6 md:pt-8">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: routes.home },
            { label: "Podcast", href: routes.podcast },
            { label: `Tập ${number}` },
          ]}
        />
      </Container>

      <Container className="editorial-grid gap-y-12 pt-6 pb-20 md:pt-10 lg:pb-28">
        {/* Poster: sticky alongside the text on wide screens */}
        <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-1">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+32px)]">
            <EpisodePoster
              episode={episode}
              preload
              sizes="(min-width: 1376px) 507px, (min-width: 1024px) 38vw, (min-width: 768px) 72vw, 100vw"
            />
          </div>
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          <header>
            <p className="eyebrow text-accent">
              {podcastSeries.englishTitle} · Tập {number}
            </p>
            <h1 className="mt-4 font-display text-display-xl font-medium text-balance">
              {episode.title}
            </h1>
            {episode.tagline ? (
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-pretty text-foreground/80">
                {episode.tagline}
              </p>
            ) : null}
            <p className="mt-5 text-sm text-muted">
              {formatAirDate(episode.airDate)} · {episode.durationLabel}
            </p>
            {episode.theme ? (
              <p className="mt-2 text-sm text-muted">Chủ đề: {episode.theme}</p>
            ) : null}
          </header>

          {episode.audio ? (
            <section id="nghe" aria-label="Nghe tập này" className="mt-10 scroll-mt-[calc(var(--header-height)+24px)]">
              <AudioPlayer
                src={episode.audio.src}
                title={`Tập ${number} · ${episode.title}`}
                durationSeconds={episode.audio.durationSeconds}
                artwork={episode.poster?.src}
                album={`${podcastSeries.title} — ${podcastSeries.englishTitle}`}
                downloadName={`${episode.slug}.mp3`}
              />
              <p className="mt-3 text-xs text-muted">
                Kịch bản đầy đủ của tập ở ngay bên dưới, bạn có thể vừa nghe vừa đọc.
              </p>
            </section>
          ) : (
            <aside className="mt-10 flex gap-4 border-y border-border py-5 text-sm text-muted">
              <AudioLines aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.5} />
              <p>
                Bản thu âm của tập này đang được hoàn thiện. Trong lúc chờ, bạn có thể đọc trọn tấm
                bưu thiếp dưới đây.
              </p>
            </aside>
          )}

          {episode.script?.map((section) => (
            <section key={section.label} aria-label={section.label} className="mt-14">
              <h2 className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                <span className="eyebrow text-foreground">{section.label}</span>
                <span className="text-xs text-muted tabular-nums">{section.time}</span>
              </h2>
              <div className="mt-8 flex flex-col gap-5">
                {section.blocks.map((block, i) =>
                  block.kind === "cue" ? (
                    <p
                      key={i}
                      className="border-l border-accent/50 pl-4 text-sm leading-relaxed italic text-muted"
                    >
                      {block.text}
                    </p>
                  ) : (
                    <p
                      key={i}
                      className="font-display text-[1.3125rem] leading-[1.6] text-pretty text-foreground"
                    >
                      {block.text}
                    </p>
                  ),
                )}
              </div>
            </section>
          ))}

          {episode.keyMessage ? (
            <figure className="mt-20 border-t border-border pt-12 text-center">
              <figcaption className="eyebrow text-muted">Điều mang theo từ tập này</figcaption>
              <blockquote className="mt-5 font-display text-display-md italic text-balance">
                “{episode.keyMessage}”
              </blockquote>
            </figure>
          ) : null}

          <nav
            aria-label="Các tập khác"
            className="mt-16 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-start sm:justify-between"
          >
            <Link
              href={routes.podcast}
              className="-my-3 inline-flex min-h-11 items-center gap-2 py-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft aria-hidden className="size-4" strokeWidth={1.5} />
              Tất cả các tập
            </Link>
            {next ? (
              <p className="text-sm sm:text-right">
                <span className="eyebrow block text-muted">
                  Tập tiếp theo · {formatAirDate(next.airDate)}
                </span>
                <span className="mt-1 block font-display text-xl text-foreground">{next.title}</span>
                {next.status === "upcoming" ? (
                  <span className="mt-1 block text-xs text-muted">Sắp ra mắt</span>
                ) : null}
              </p>
            ) : null}
          </nav>
        </div>
      </Container>
    </article>
  );
}
