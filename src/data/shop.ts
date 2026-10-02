/**
 * The merchandise. Prices here are PLACEHOLDER values so the shop renders as
 * a shop; the client sets real prices and the shop page says out loud that
 * these are sample prices until then. The five products are the five on
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
  /** PLACEHOLDER until the client prices it. Integer cents. */
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
    photo: "/shop/the-tee-2.jpg",
    photoAlt: "A black tee with the brush mark across the chest",
  },
  {
    slug: "the-hoodie",
    name: "The hoodie",
    line: "Small mark on the chest. The four lines on the back.",
    priceCents: 5800,
    sizes: ["S", "M", "L", "XL", "2XL"],
    print: "Speak up. Step in. Protect. Be a better man. Ruin the party.",
    color: "black",
    kind: "hoodie",
    photo: "/shop/the-hoodie-2.jpg",
    photoAlt: "The back of a gray hoodie with the four lines printed down it",
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
    photo: "/shop/the-hat-2.jpg",
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
    photo: "/shop/the-wristband-2.jpg",
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
    photo: "/shop/the-bottle-2.jpg",
    photoAlt: "A matte black steel bottle with the brush mark on it",
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

export const money = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: cents % 100 ? 2 : 0 });
