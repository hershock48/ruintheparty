/**
 * The merchandise. Prices here are PLACEHOLDER values so the shop renders as
 * a shop; the client sets real prices and the shop page says out loud that
 * these are sample prices until then. Prices resolve SERVER-SIDE from this
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
  kind: "tee" | "hoodie" | "hat" | "band" | "sticker";
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
  },
  {
    slug: "the-hat",
    name: "The hat",
    line: "Trucker. Black mesh. Patch on the front.",
    priceCents: 3200,
    sizes: ["One size"],
    print: "The #R mark on a stitched patch.",
    color: "black",
    kind: "hat",
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
  },
  {
    slug: "sticker-pack",
    name: "Sticker pack",
    line: "Five stickers. Water bottles, laptops, helmets, lockers.",
    priceCents: 800,
    sizes: ["Pack of 5"],
    print: "The mark, the hashtag, the #R, and two of the lines.",
    color: "teal",
    kind: "sticker",
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

export const money = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: cents % 100 ? 2 : 0 });
