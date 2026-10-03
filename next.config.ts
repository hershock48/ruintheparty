import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOINDEX ON THE PITCH HOST ONLY, since launch (2026-10-03).
  //
  // ruintheparty.com is the site and is indexable. The copy at
  // ruintheparty.glazedweb.com/demo and the proposal at its root stay out
  // of search: a second copy of the content would compete with the real
  // one, and the letter is a sales document. robots.txt cannot vary by
  // host, so this header is the lock: X-Robots-Tag is an instruction on
  // every response from that host. Delete with the pitch folder and the
  // rewrites below.
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ruintheparty.glazedweb.com" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
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
