import { useEffect } from "react";
import { create } from "zustand";
import type { CreamId, FinishId, OccasionId, SizeId } from "@/lib/catalog";
import { getCake, sizeById } from "@/lib/catalog";
import { messages, type Locale, type Messages } from "@/lib/messages";

export type { Locale, Messages };

export const LOCALES: {
  id: Locale;
  short: string;
  name: string;
  html: string;
}[] = [
  { id: "en", short: "EN", name: "English", html: "en" },
  { id: "zh", short: "中", name: "中文", html: "zh-CN" },
];

const STORAGE_KEY = "qitang-locale-v2";

export function isLocale(v: unknown): v is Locale {
  return v === "en" || v === "zh";
}

export function detectLocale(): Locale {
  return "en";
}

type I18nState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  hydrate: () => void;
};

export const useI18n = create<I18nState>((set) => ({
  locale: "en",
  setLocale: (locale) => {
    set({ locale });
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang =
      LOCALES.find((l) => l.id === locale)?.html ?? "en";
  },
  hydrate: () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    const locale = isLocale(saved) ? saved : "en";
    set({ locale });
    document.documentElement.lang =
      LOCALES.find((l) => l.id === locale)?.html ?? "en";
  },
}));

export function useCopy(): Messages {
  return messages[useI18n((s) => s.locale)];
}

export function useLocale(): Locale {
  return useI18n((s) => s.locale);
}

export function cakeCopy(copy: Messages, slug: string) {
  const cake = getCake(slug);
  const label = cake ? copy.categories[cake.category] : slug;
  return {
    name: label,
    latin: "",
    tagLabel: label,
    servings: "",
    blurb: copy.collection.lead,
    tasting: copy.collection.lead,
    layers: "",
    season: "",
  };
}

export function occasionCopy(copy: Messages, id: OccasionId) {
  return copy.occasions[id];
}

export function sizeCopy(copy: Messages, id: SizeId) {
  const base = sizeById(id);
  return {
    label: base?.label ?? id,
    servings: copy.sizes[id]?.servings ?? base?.servings ?? "",
    cm: base?.cm,
  };
}

export function creamCopy(copy: Messages, id: CreamId) {
  return copy.creams[id] ?? id;
}

export function tasteCopy(copy: Messages, id: string) {
  return copy.tastes[id] ?? id;
}

export function tasteNoteCopy(copy: Messages, note: string | undefined) {
  if (!note) return "";
  return copy.tasteNotes[note] ?? "";
}

export function finishCopy(copy: Messages, id: FinishId) {
  return copy.finishes[id];
}

export function I18nBoot() {
  const hydrate = useI18n((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return null;
}

export function interpolate(
  template: string,
  vars: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(vars[key] ?? ""),
  );
}
