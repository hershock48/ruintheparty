import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOINDEX, DELIBERATELY, UNTIL THIS IS THEIR SITE.
  //
  // This is a spec build served from a Glazed Web hostname. Letting search
  // engines index it would put a copy of Ruin the Party's content in
  // competition with the real thing on ruintheparty.com the day it launches.
  // src/app/robots.ts disallows everything and this header is the belt to its
  // braces: robots.txt is a request, X-Robots-Tag is an instruction on every
  // response. Remove BOTH on the day it becomes their site, and not before.
  // It is on the before-launch checklist in the README.
  async headers() {
    return [
      { source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },

  // The pitch host split (glaze/proposal.md): the proposal at the root of
  // ruintheparty.glazedweb.com, the demo site under /demo, and the client's
  // own domain (when it goes live) serving the site at its root with no
  // proposal anywhere. These MUST be in beforeFiles: a plain rewrites() array
  // is afterFiles, which only runs after Next has failed to find a page, and
  // app/page.tsx already answers "/", so the root rewrite would silently never
  // fire. Host scoping rather than basePath, because basePath is global to the
  // build and would bury the real site under /demo on launch day. Accepted
  // wart: links are root-relative, so the /demo prefix drops off after the
  // first click. Nothing 404s.
  //
  // The proposal is a FOLDER (public/pitch/ruintheparty/), not a lone html
  // file, because it carries its own favicons and its own share card. Without
  // them the page falls back to the origin root and a Glazed sales document
  // goes out wearing the client's own mark and the demo's picture.
  //
  // Delete the pitch folder and these rewrites once the client signs or passes.
  async rewrites() {
    const onPitchHost = [{ type: "host" as const, value: "ruintheparty.glazedweb.com" }];
    return {
      beforeFiles: [
        { source: "/", destination: "/pitch/ruintheparty/index.html", has: onPitchHost },
        { source: "/demo", destination: "/", has: onPitchHost },
        { source: "/demo/:path*", destination: "/:path*", has: onPitchHost },
        // The proposal answers at "/" on the pitch host and NOWHERE else. Any
        // other hostname asking for /pitch/... gets the 404 it should, so the
        // letter is never readable at a second address nothing points at.
        { source: "/pitch/:path*", destination: "/_not-found", missing: onPitchHost },
      ],
    };
  },
};

export default nextConfig;
