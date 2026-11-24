import { CategoryExplorer } from "@/components/home/category-explorer";
import { ClosingStatement } from "@/components/home/closing-statement";
import { FeaturedFilm } from "@/components/home/featured-film";
import { FilmsIntro } from "@/components/home/films-intro";
import { HeroSection } from "@/components/home/hero-section";
import { LatestFilms } from "@/components/home/latest-films";
import { MoodExplorer } from "@/components/home/mood-explorer";
import { PodcastSpotlight } from "@/components/home/podcast-spotlight";
import { publishedEpisodes } from "@/data/podcast";
import { getContentRepository } from "@/lib/content";
import { routes } from "@/lib/routes";
import { countBy } from "@/lib/video-query";

const LATEST_LIMIT = 6;

/*
 * Two clearly separate areas:
 *  1. Podcast "Những điều nhỏ bé" — the main content, right after the hero.
 *  2. "Thước phim" — the short-film archive, introduced by its own heading.
 */
export default async function HomePage() {
  const repo = await getContentRepository();
  const [featured, moods, categories, publicVideos] = await Promise.all([
    repo.getFeaturedVideo(),
    repo.getMoods(),
    repo.getCategories(),
    repo.getPublicVideos(),
  ]);
  const latest = await repo.getLatestVideos({
    limit: LATEST_LIMIT,
    excludeIds: featured ? [featured.id] : [],
  });

  const latestEpisode = publishedEpisodes[publishedEpisodes.length - 1];
  const featuredCategory = categories.find((c) => c.id === featured?.categoryId);

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
      {latestEpisode ? <PodcastSpotlight episode={latestEpisode} /> : null}

      <FilmsIntro />
      {featured ? (
        <FeaturedFilm
          video={featured}
          categoryLabel={featuredCategory?.label ?? ""}
          moods={moods}
        />
      ) : null}
      {latest.length > 0 ? <LatestFilms videos={latest} categories={categories} /> : null}
      <MoodExplorer moods={moods} counts={countBy(publicVideos, (v) => v.moodIds)} />
      <CategoryExplorer
        categories={categories}
        counts={countBy(publicVideos, (v) => [v.categoryId])}
      />
      <ClosingStatement />
    </>
  );
}
