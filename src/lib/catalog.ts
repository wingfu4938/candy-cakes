import { GALLERY, KIDS_THEME_ORDER, type CategoryId, type GalleryCake, type KidsThemeId } from "@/lib/gallery-data";

export type { CategoryId, GalleryCake, KidsThemeId };
export { KIDS_THEME_ORDER };
export type SizeId = string;
export type SizeGroup = "single" | "tiered";
export type FlavorId = string;
export type CreamId = "cheese-mousse" | "fresh-cream" | "butter-cream";

/** Keys for the order wizard steps. When a design is prefilled (from a cake
 * detail page), the "design" step is skipped. */
export type OrderStepKey = "size" | "design" | "flavor" | "contact";

export type Cake = GalleryCake;

export const CATEGORY_IDS: CategoryId[] = [
  "kids",
  "baby",
  "pipe",
  "fresh",
  "fruit",
  "boss",
  "lady",
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
  { id: "6", group: "single", label: "6 inch", servings: "feeds about 4-8 people", cm: "16cm" },
  { id: "8", group: "single", label: "8 inch", servings: "feeds about 8-15 people", cm: "20cm" },
  { id: "10", group: "single", label: "10 inch", servings: "feeds about 20-25 people", cm: "25cm" },
  { id: "12", group: "single", label: "12 inch", servings: "feeds about 25-35 people", cm: "30cm" },
  { id: "5+8", group: "tiered", label: "5+8 inch", servings: "feeds about 10-18 people" },
  { id: "6+6", group: "tiered", label: "6+6 inch", servings: "feeds about 10-15 people" },
  { id: "6+8", group: "tiered", label: "6+8 inch", servings: "feeds about 18-25 people" },
  { id: "6+10", group: "tiered", label: "6+10 inch", servings: "feeds about 22-35 people" },
  { id: "8+10", group: "tiered", label: "8+10 inch", servings: "feeds about 30-40 people" },
  { id: "8+12", group: "tiered", label: "8+12 inch", servings: "feeds about 35-50 people" },
  { id: "10+12", group: "tiered", label: "10+12 inch", servings: "feeds about 45-65 people" },
  { id: "5+8+12", group: "tiered", label: "5+8+12 inch", servings: "feeds about 45-65 people" },
  { id: "5+8+10", group: "tiered", label: "5+8+10 inch", servings: "feeds about 40-60 people" },
  { id: "6+8+10", group: "tiered", label: "6+8+10 inch", servings: "feeds about 45-65 people" },
  { id: "8+10+12", group: "tiered", label: "8+10+12 inch", servings: "feeds about 60-80 people" },
];

export const SINGLE_TIER_SIZES = SIZES.filter((s) => s.group === "single");
export const TIERED_SIZES = SIZES.filter((s) => s.group === "tiered");

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

export function leadDaysFor(input: {
  flavor: FlavorId | null;
}) {
  let days = 2;
  const cake = input.flavor ? getCake(input.flavor) : undefined;
  if (cake?.category === "wed") days = 7;
  if (cake && ["kids", "baby", "cre"].includes(cake.category)) days = Math.max(days, 3);
  return days;
}

export const VISIT = {
  facebook: "https://m.me/438937936222608",
  facebookPage: "https://www.facebook.com/CandyCakesNZ",
  maps: "https://maps.google.com/?q=Shop+4+977+Heaphy+Terrace+Fairfield+Hamilton+3214",
};

/**
 * Opening hours for a given date (YYYY-MM-DD):
 * Tue 2–6pm, Wed–Fri 11am–6pm, Sat–Sun 9am–6pm, Mon closed.
 * Returns null on Mondays.
 */
export function openingHoursFor(dateStr: string): { open: string; close: string } | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
  const d = new Date(`${dateStr}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  const day = d.getDay(); // 0=Sun … 6=Sat
  if (day === 1) return null; // Monday closed
  if (day === 2) return { open: "14:00", close: "18:00" }; // Tue 2–6pm
  if (day === 6 || day === 0) return { open: "09:00", close: "18:00" };
  return { open: "11:00", close: "18:00" }; // Wed–Fri
}

/** YYYY-MM-DD for a date `days` from today (local time). */
export function dateStrFromToday(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/** True when the given YYYY-MM-DD is a Monday (shop closed). */
export function isMonday(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  return new Date(`${dateStr}T12:00:00`).getDay() === 1;
}
