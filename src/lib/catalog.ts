import { GALLERY, KIDS_THEME_ORDER, type CategoryId, type GalleryCake, type KidsThemeId } from "@/lib/gallery-data";

export type { CategoryId, GalleryCake, KidsThemeId };
export { KIDS_THEME_ORDER };
export type OccasionId =
  | "wedding"
  | "birthday"
  | "anniversary"
  | "seasonal"
  | "other";

export type SizeId = "4" | "6" | "8" | "10" | "tier2";
export type FlavorId = string;
export type FinishId =
  | "velvet"
  | "buttercream"
  | "fruit"
  | "sugar-flower"
  | "naked";

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

export const SIZES: {
  id: SizeId;
  delta: number;
}[] = [
  { id: "4", delta: -30 },
  { id: "6", delta: 0 },
  { id: "8", delta: 30 },
  { id: "10", delta: 70 },
  { id: "tier2", delta: 150 },
];

export const BASE_PRICE = 118;

export const FINISHES: {
  id: FinishId;
  extra: number;
}[] = [
  { id: "velvet", extra: 0 },
  { id: "buttercream", extra: 25 },
  { id: "fruit", extra: 15 },
  { id: "sugar-flower", extra: 60 },
  { id: "naked", extra: 0 },
];

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

export function cakesIn(category: CategoryId) {
  return CAKES.filter((c) => c.category === category);
}

export function sizePrice(size: SizeId) {
  const found = SIZES.find((s) => s.id === size);
  return BASE_PRICE + (found?.delta ?? 0);
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

export function quotePrice(input: {
  size: SizeId | null;
  flavor: FlavorId | null;
  finish: FinishId | null;
}) {
  const cake = input.flavor ? getCake(input.flavor) : undefined;
  const size = SIZES.find((s) => s.id === input.size);
  if (!cake || !size) return null;
  const finish = FINISHES.find((s) => s.id === input.finish);
  return BASE_PRICE + size.delta + (finish?.extra ?? 0);
}

export const VISIT = {
  facebook: "https://m.me/CandyCakesNZ",
  facebookPage: "https://www.facebook.com/CandyCakesNZ",
  maps: "https://maps.google.com/?q=Shop+4+97Z+Heaphy+Terrace+Fairfield+Hamilton+3214",
};
