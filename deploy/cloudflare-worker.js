/**
 * Cloudflare Worker: serves Little Postcard (Healing) at rabbittarot.io.vn/healing
 *
 * Route (Cloudflare → Workers Routes):   rabbittarot.io.vn/healing*
 * Everything outside /healing never reaches this Worker and is served by the
 * rabbit-tarot GitHub Pages site exactly as before.
 *
 * The pages come from the Healing repo's gh-pages branch, folder rt/, which is
 * built with basePath "/healing" (npm run build:pages). The two repos deploy
 * independently: nothing here needs to change when either site is updated.
 */
const ORIGIN = "https://theanhsimple.github.io/Healing/rt";
const PREFIX = "/healing";

// Request headers worth passing on (Range is what lets audio and video seek).
const FORWARD = ["accept", "accept-encoding", "accept-language", "range", "if-none-match", "if-modified-since"];

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const { pathname } = url;

    // "/healingfoo" is not ours: hand it back to the main site untouched.
    if (pathname !== PREFIX && !pathname.startsWith(`${PREFIX}/`)) return fetch(request);

    // "/healing" → "/healing/" (the site is built with trailing slashes).
    if (pathname === PREFIX) return Response.redirect(`${url.origin}${PREFIX}/${url.search}`, 301);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { allow: "GET, HEAD" } });
    }

    const headers = new Headers();
    for (const name of FORWARD) {
      const value = request.headers.get(name);
      if (value) headers.set(name, value);
    }

    const upstream = `${ORIGIN}${pathname.slice(PREFIX.length)}${url.search}`;
    let response = await fetch(upstream, { method: request.method, headers, redirect: "manual" });

    // GitHub redirects "/podcast" → "/podcast/" with an absolute github.io URL:
    // point it back at rabbittarot.io.vn instead.
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location") ?? "";
      const rewritten = location.startsWith(ORIGIN) ? `${PREFIX}${location.slice(ORIGIN.length)}` : location;
      const out = new Response(null, response);
      out.headers.set("location", rewritten);
      return out;
    }

    // Unknown page: show Little Postcard's own 404 page, with a real 404 status.
    if (response.status === 404) {
      const notFound = await fetch(`${ORIGIN}/404.html`);
      return new Response(notFound.body, {
        status: 404,
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
      });
    }

    return new Response(response.body, response);
  },
};
