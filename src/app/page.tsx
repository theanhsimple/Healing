import { AuthorTeaser } from "@/components/home/author-teaser";
import { ClosingStatement } from "@/components/home/closing-statement";
import { DailyMessage } from "@/components/home/daily-message";
import { HeroSection } from "@/components/home/hero-section";
import { HomeFilms } from "@/components/home/home-films";
import { PodcastSpotlight } from "@/components/home/podcast-spotlight";
import { publishedEpisodes } from "@/data/podcast";
import { getContentRepository } from "@/lib/content";
import { routes } from "@/lib/routes";

/*
 * Home, kept short on purpose:
 *  hero → today's message → podcast (main content) → films (one block)
 *  → who is behind it → closing line.
 * Full lists live on /podcast and /library.
 */
export default async function HomePage() {
  const repo = await getContentRepository();
  const [moods, categories, latest] = await Promise.all([
    repo.getMoods(),
    repo.getCategories(),
    repo.getLatestVideos({ limit: 3 }),
  ]);
  const latestEpisode = publishedEpisodes[publishedEpisodes.length - 1];

  return (
    <>
      <HeroSection
        primary={
          latestEpisode
            ? { href: routes.podcastEpisode(latestEpisode.slug), label: "Nghe tập mới nhất" }
            : { href: routes.podcast, label: "Nghe podcast" }
        }
        secondary={{ href: routes.library(), label: "Xem thước phim" }}
      />
      <DailyMessage />
      {latestEpisode ? <PodcastSpotlight episode={latestEpisode} /> : null}
      {latest.length > 0 ? <HomeFilms videos={latest} categories={categories} moods={moods} /> : null}
      <AuthorTeaser />
      <ClosingStatement />
    </>
  );
}
