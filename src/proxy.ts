import { NextResponse, type NextRequest } from "next/server";
import { getEpisode } from "@/data/podcast";
import { getContentRepository } from "@/lib/content";

/**
 * Real 404 status for postcards and podcast episodes that do not exist
 * or are not public.
 *
 * With Cache Components the page's prerendered shell starts a 200 response
 * before the page can check its slug, so `notFound()` alone yields the
 * right UI (plus noindex) but the wrong status. Proxy runs before
 * rendering; rewriting to an unmatched path renders app/not-found.tsx
 * with a 404. The page keeps its own notFound() as a second line.
 */
export async function proxy(request: NextRequest) {
  const [, section, rawSlug] = request.nextUrl.pathname.split("/");
  const slug = decodeURIComponent(rawSlug ?? "");
  const exists =
    section === "podcast"
      ? Boolean(getEpisode(slug))
      : Boolean(slug && (await (await getContentRepository()).getVideoBySlug(slug)));
  if (exists) return NextResponse.next();
  return NextResponse.rewrite(new URL("/__not-found", request.url));
}

export const config = {
  matcher: ["/postcard/:slug", "/podcast/:slug"],
};
