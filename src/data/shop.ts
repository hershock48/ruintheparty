/**
 * The merchandise. The prices are the client's (confirmed 2026-10-03; the
 * first cut carried them as placeholders and he kept them). The five
 * products are the five on
 * the client's own boards, and each tile photo is a crop from those boards
 * (public/shop/, cut by tools/crops.sh), to be replaced by product
 * photography when the goods exist. Kevin, 2026-10-01: use his photos so
 * the store looks legit. Prices resolve SERVER-SIDE from this
 * file in /api/checkout; a tampered form cannot invent one.
 *
 * Amounts are integer cents. Floating-point money is how a $28 shirt becomes
 * $27.999999.
 */
export type Product = {
  slug: string;
  name: string;
  line: string;
  /** Integer cents. The client's price. */
  priceCents: number;
  sizes: string[];
  /** What is printed where. Keep it to what the boards show. */
  print: string;
  /** The colorway, for the card. */
  color: "black" | "teal" | "white";
  kind: "tee" | "hoodie" | "hat" | "band" | "bottle";
  /** The tile photo, a crop from the client's own boards (public/shop/). */
  photo: string;
  /** What the crop shows, for the alt text. */
  photoAlt: string;
};

export const products: Product[] = [
  {
    slug: "the-tee",
    name: "The tee",
    line: "The hashtag across the chest. Heavyweight, boxy, black.",
    priceCents: 2800,
    sizes: ["S", "M", "L", "XL", "2XL"],
    print: "#RuinTheParty on the front, nothing on the back.",
    color: "black",
    kind: "tee",
    photo: "/shop/the-tee.jpg",
    photoAlt: "A black tee with the brush mark across the chest",
  },
  {
    slug: "the-hoodie",
    name: "The hoodie",
    line: "Small mark on the chest. The five lines on the back.",
    priceCents: 5800,
    sizes: ["S", "M", "L", "XL", "2XL"],
    print: "Speak up. Step in. Protect. Be a better man. Ruin the party.",
    color: "black",
    kind: "hoodie",
    photo: "/shop/the-hoodie.jpg",
    photoAlt: "The back of a gray hoodie with the five lines printed down it",
  },
  {
    slug: "the-hat",
    name: "The hat",
    line: "Trucker. Black mesh. Stitched patch on the front.",
    priceCents: 3200,
    sizes: ["One size"],
    print: "The boxed RUIN THE PARTY mark on a stitched patch.",
    color: "black",
    kind: "hat",
    photo: "/shop/the-hat.jpg",
    photoAlt: "A black trucker cap with the boxed Ruin the Party patch, on a rock",
  },
  {
    slug: "the-wristband",
    name: "The wristband",
    line: "Black silicone. The one that starts conversations in the weight room.",
    priceCents: 500,
    sizes: ["Adult", "Youth"],
    print: "#RUINTHEPARTY on the outside. GOOD MEN DON'T STAY SILENT. on the inside.",
    color: "black",
    kind: "band",
    photo: "/shop/the-wristband.jpg",
    photoAlt: "Two black silicone wristbands, one reading #RuinTheParty and one reading Good men don't stay silent",
  },
  {
    slug: "the-bottle",
    name: "The bottle",
    line: "Matte black steel. The mark on one side, the #R on the other.",
    priceCents: 2400,
    sizes: ["32 oz"],
    print: "#RuinTheParty on one side, the #R mark on the other.",
    color: "black",
    kind: "bottle",
    photo: "/shop/the-bottle.jpg",
    photoAlt: "A matte black steel bottle with the brush mark on it",
  },
];

/**
 * The first run is sold as pre-orders (the client, 2026-10-03): the buy
 * button says so and the checkout line item carries it, so nobody expects
 * a box in three days. The point he wants made is that a buyer is in at
 * the start of something, the first run, not a backer of a campaign: so
 * the copy says "first run" and "in at the start", and there is no goal,
 * no counter, no countdown. The window is his (about 4 weeks, confirmed).
 */
export const PREORDER = { on: true, ships: "in about 4 weeks" } as const;

/**
 * Where the money goes (the client, 2026-10-03): a share of every sale
 * goes to local youth resources. He has not named the percentage yet, so
 * the line says "a portion"; when he does, set `percent` and the line
 * will say the number. One place, three surfaces (shop, product, home).
 */
export const GIVING = {
  percent: null as number | null,
  to: "local youth resources",
} as const;
export const givingLine = () =>
  GIVING.percent ? `${GIVING.percent}% of every sale goes to ${GIVING.to}.` : `A portion of every sale goes to ${GIVING.to}.`;

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

export const money = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: cents % 100 ? 2 : 0 });
