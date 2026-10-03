import { GALLERY, KIDS_THEME_ORDER, type CategoryId, type GalleryCake, type KidsThemeId } from "@/lib/gallery-data";

export type { CategoryId, GalleryCake, KidsThemeId };
export { KIDS_THEME_ORDER };
export type OccasionId =
  | "wedding"
  | "birthday"
  | "anniversary"
  | "seasonal"
  | "other";

export type SizeId = string;
export type SizeGroup = "single" | "tiered";
export type FlavorId = string;
export type FinishId =
  | "velvet"
  | "buttercream"
  | "fruit"
  | "sugar-flower"
  | "naked";
export type CreamId = "cheese-mousse" | "fresh-cream" | "butter-cream";

export type Cake = GalleryCake;

export const OCCASION_IDS: OccasionId[] = [
  "wedding",
  "birthday",
  "anniversary",
  "seasonal",
  "other",
];

export const CATEGORY_IDS: CategoryId[] = [
  "kids",
  "baby",
  "pipe",
  "fresh",
  "fruit",
  "boss",
  "old",
  "cre",
  "wed",
  "cup",
];

export type CakeSize = {
  id: SizeId;
  group: SizeGroup;
  /** English display label, e.g. "5 inch". */
  label: string;
  /** English servings text, e.g. "feeds about 2 people". */
  servings: string;
  /** Diameter, single tier only, e.g. "14cm". */
  cm?: string;
};

export const SIZES: CakeSize[] = [
  { id: "5", group: "single", label: "5 inch", servings: "feeds about 2 people", cm: "14cm" },
  { id: "6", group: "single", label: "6 inch", servings: "feeds about 3-6 people", cm: "16cm" },
  { id: "8", group: "single", label: "8 inch", servings: "feeds about 8-15 people", cm: "20cm" },
  { id: "10", group: "single", label: "10 inch", servings: "feeds about 15-25 people", cm: "25cm" },
  { id: "12", group: "single", label: "12 inch", servings: "feeds about 20-30 people", cm: "30cm" },
  { id: "5+8", group: "tiered", label: "5+8 inch", servings: "feeds about 10-18 people" },
  { id: "6+6", group: "tiered", label: "6+6 inch", servings: "feeds about 10-15 people" },
  { id: "6+8", group: "tiered", label: "6+8 inch", servings: "feeds about 12-20 people" },
  { id: "6+10", group: "tiered", label: "6+10 inch", servings: "feeds about 18-26 people" },
  { id: "8+10", group: "tiered", label: "8+10 inch", servings: "feeds about 10-18 people" },
  { id: "8+12", group: "tiered", label: "8+12 inch", servings: "feeds about 30-45 people" },
  { id: "10+12", group: "tiered", label: "10+12 inch", servings: "feeds about 45-65 people" },
  { id: "5+8+12", group: "tiered", label: "5+8+12 inch", servings: "feeds about 45-65 people" },
  { id: "6+8+10", group: "tiered", label: "6+8+10 inch", servings: "feeds about 40-60 people" },
  { id: "8+10+12", group: "tiered", label: "8+10+12 inch", servings: "feeds about 60-80 people" },
];

export const SINGLE_TIER_SIZES = SIZES.filter((s) => s.group === "single");
export const TIERED_SIZES = SIZES.filter((s) => s.group === "tiered");

export const FINISHES: {
  id: FinishId;
}[] = [
  { id: "velvet" },
  { id: "buttercream" },
  { id: "fruit" },
  { id: "sugar-flower" },
  { id: "naked" },
];

export const CREAM_TYPES: { id: CreamId }[] = [
  { id: "cheese-mousse" },
  { id: "fresh-cream" },
  { id: "butter-cream" },
];

export type CreamFlavor = {
  id: string;
  /** Key into messages' tasteNotes, e.g. "sweet-or-salty". */
  note?: string;
};

export const CREAM_FLAVORS: Record<CreamId, CreamFlavor[]> = {
  "cheese-mousse": [
    { id: "classic-plain" },
    { id: "tiramisu" },
    { id: "vanilla" },
    { id: "lemon" },
    { id: "rainbow-cake" },
    { id: "redvelvet" },
    { id: "chocolate" },
    { id: "taro" },
    { id: "season-fruit" },
    { id: "chocolate-cookies-cream", note: "sweet-or-salty" },
    { id: "salt-caramel", note: "almonds-option" },
    { id: "matcha" },
    { id: "mocha-coffee" },
  ],
  "fresh-cream": [
    { id: "classic-plain" },
    { id: "vanilla" },
    { id: "lemon" },
    { id: "rainbow-cake" },
    { id: "redvelvet" },
    { id: "chocolate" },
    { id: "sesame" },
    { id: "strawberry" },
    { id: "mango" },
    { id: "mixed-season-fruit" },
    { id: "durian" },
    { id: "pandan-coconut-durian" },
    { id: "chocolate-cookies-cream", note: "sweet-or-salty" },
    { id: "salt-caramel", note: "almonds-option" },
    { id: "taro" },
    { id: "taro-coconut-cream" },
    { id: "matcha" },
    { id: "matcha-red-beans" },
    { id: "matcha-fresh-fruit" },
    { id: "mocha-coffee" },
  ],
  "butter-cream": [
    { id: "classic-plain" },
    { id: "vanilla" },
    { id: "lemon" },
    { id: "rainbow-cake" },
    { id: "redvelvet" },
    { id: "sesame" },
    { id: "chocolate" },
    { id: "chocolate-cookies-cream", note: "sweet-or-salty" },
    { id: "salt-caramel", note: "almonds-option" },
    { id: "matcha" },
    { id: "mocha-coffee" },
  ],
};

export const CAKES: Cake[] = GALLERY;

export const FEATURED_SLUGS = [
  "kids-001",
  "baby-001",
  "pipe-001",
  "fresh-001",
  "fruit-001",
  "wed-001",
];

export function getCake(slug: string) {
  return CAKES.find((c) => c.slug === slug);
}

/** Display number derived from the slug, e.g. "kids-023" -> "023". */
export function cakeNumber(cake: Cake): string {
  const parts = cake.slug.split("-");
  return parts[parts.length - 1];
}

export function cakesIn(category: CategoryId) {
  return CAKES.filter((c) => c.category === category);
}

export function sizeById(id: SizeId | null | undefined) {
  return SIZES.find((s) => s.id === id);
}

export function occasionFor(category: CategoryId): OccasionId {
  if (category === "wed") return "wedding";
  if (category === "fruit" || category === "fresh") return "anniversary";
  if (category === "boss" || category === "old") return "other";
  return "birthday";
}

export function leadDaysFor(input: {
  occasion: OccasionId | null;
  finish: FinishId | null;
  flavor: FlavorId | null;
}) {
  let days = 2;
  const cake = input.flavor ? getCake(input.flavor) : undefined;
  if (cake?.category === "wed") days = 7;
  if (cake && ["kids", "baby", "cre"].includes(cake.category)) days = Math.max(days, 3);
  if (input.occasion === "wedding") days = Math.max(days, 7);
  if (input.finish === "sugar-flower") days = Math.max(days, 7);
  return days;
}

export const VISIT = {
  facebook: "https://m.me/438937936222608",
  facebookPage: "https://www.facebook.com/CandyCakesNZ",
  maps: "https://maps.google.com/?q=Shop+4+97Z+Heaphy+Terrace+Fairfield+Hamilton+3214",
};
