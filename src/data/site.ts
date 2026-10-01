/**
 * Every fact about Ruin the Party lives here and nowhere else, so a correction
 * is one edit. The brand, the phrase and the pillars came from the client's
 * own brief (October 2026); the brush mark is their file. Anything marked
 * PLACEHOLDER is unconfirmed and is on the README's before-launch checklist.
 *
 * glaze/intake.md: a guess written as a plain value is worse than a blank,
 * because the next person cannot tell an assumption from a confirmed fact.
 */

export const site = {
  name: "Ruin the Party",
  hashtag: "#RuinTheParty",
  /** The client's line, from the brief and the boards. */
  tagline: "Good men don't stay silent.",
  blurb:
    "Ruin the Party talks to young men about consent, boundaries and what to do when another man crosses the line. Speak up. Step in. Ruin the party.",
  /** Canonical host. Their real domain, never the vercel.app one. */
  url: "https://ruintheparty.com",
  /** The pitch host, only while this is a spec build. Used for the share card. */
  pitchUrl: "https://ruintheparty.glazedweb.com",
  /** PLACEHOLDER: no mailbox has been confirmed. The form still works without
   *  one (it logs and tells the visitor the truth), but this address prints
   *  on the contact page and the footer. */
  email: "hello@ruintheparty.com",
  social: {
    /** PLACEHOLDER: handles unconfirmed. The boards show @ruintheparty. */
    instagram: "https://www.instagram.com/ruintheparty",
    tiktok: "https://www.tiktok.com/@ruintheparty",
  },
  /** PLACEHOLDER: who is behind it, as they want it said. */
  founder: "",
} as const;

/** The primary nav, in reading order. Contact is the CTA, not a nav item. */
export const nav = [
  { href: "/what-it-means", label: "What it means" },
  { href: "/know-the-line", label: "Know the line" },
  { href: "/be-the-guy", label: "Be the guy" },
  { href: "/parents", label: "Parents" },
  { href: "/teams", label: "Teams" },
  { href: "/resources", label: "Resources" },
  { href: "/shop", label: "Shop" },
] as const;

/**
 * The shop is built and switched off. It takes TWO things to open it: the
 * client's own STRIPE_SECRET_KEY, and SHOP_OPEN=1, set on purpose once the
 * real prices are in src/data/shop.ts. The key alone is not enough, because
 * the moment it is set the placeholder prices would be charged to real cards.
 * Until both are set the buy button tells the visitor the store is not open
 * yet instead of pretending.
 *
 * Read at BUILD time by the static shop pages and at request time by
 * /api/checkout, so changing either variable needs a redeploy.
 */
export const SHOP_LIVE = process.env.SHOP_OPEN === "1" && Boolean(process.env.STRIPE_SECRET_KEY);

/** The four moves, from the client's boards. Icons live in the component. */
export const moves = [
  { key: "see", title: "See it", text: "Recognize when something isn't right." },
  { key: "say", title: "Say it", text: "Speak up. Call it out." },
  { key: "step", title: "Step in", text: "Take action. Help create a safer situation." },
  { key: "better", title: "Be a better man", text: "Hold each other accountable." },
] as const;

/**
 * The refrain. The client's brief gives these as the way the phrase works,
 * and the repetition is the device, not a tic: every line ends the same way
 * on purpose. It appears once, on the home page, and nowhere else.
 */
export const refrain = [
  { setup: "Your teammate won't leave a drunk girl alone?" },
  { setup: "Your friend keeps pressuring someone after she says no?" },
  { setup: "Someone is trying to take an extremely intoxicated person home?" },
  { setup: "The group chat crosses a line?" },
  { setup: "Your friends make you feel stupid for speaking up?", answer: "Ruin the party anyway." },
] as const;
