import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { CakeImage } from "@/components/cake-image";
import { CAKES, CATEGORY_IDS, KIDS_THEME_ORDER, cakeNumber, type CategoryId, type KidsThemeId } from "@/lib/catalog";
import { useCopy } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/collection/")({ component: Collection });

function Collection() {
  const copy = useCopy();
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [theme, setTheme] = useState<KidsThemeId | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const cakes = CAKES.filter((c) => {
    if (filter !== "all" && c.category !== filter) return false;
    if (filter === "kids" && theme !== "all" && c.theme !== theme) return false;
    return true;
  });
  const opened = open ? CAKES.find((c) => c.slug === open) : undefined;

  function cakeAlt(cake: (typeof CAKES)[number]) {
    const base = copy.categories[cake.category];
    if (cake.theme) return `${base} · ${copy.themes[cake.theme]}`;
    return base;
  }

  const filters: { id: CategoryId | "all"; label: string }[] = [
    { id: "all", label: copy.collection.all },
    ...CATEGORY_IDS.map((id) => ({ id, label: copy.categories[id] })),
  ];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    if (!open) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <p className="font-sans text-xs tracking-kicker text-muted-foreground uppercase">
        {copy.collection.kicker}
      </p>
      <h1 className="mt-3 font-display text-display text-foreground">
        {copy.collection.title}
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        {copy.collection.lead}
      </p>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => {
              setFilter(f.id);
              setTheme("all");
            }}
            className={cn(
              "inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-150",
              filter === f.id
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filter === "kids" && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <button
            key="all"
            type="button"
            onClick={() => setTheme("all")}
            className={cn(
              "inline-flex h-9 shrink-0 items-center rounded-full px-3 text-xs transition-colors duration-150",
              theme === "all"
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {copy.collection.all}
          </button>
          {KIDS_THEME_ORDER.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={cn(
                "inline-flex h-9 shrink-0 items-center rounded-full px-3 text-xs transition-colors duration-150",
                theme === t
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {copy.themes[t]}
            </button>
          ))}
        </div>
      )}

      {cakes.length === 0 ? (
        <p className="mt-16 text-sm text-muted-foreground">
          {copy.collection.empty}
        </p>
      ) : (
        <div className="mt-8 columns-2 gap-2 md:columns-3 md:gap-3">
          {cakes.map((cake) => (
            <button
              key={cake.slug}
              type="button"
              onClick={() => setOpen(cake.slug)}
              className="relative mb-2 block w-full break-inside-avoid overflow-hidden rounded-lg md:mb-3"
            >
              <CakeImage
                src={cake.image}
                alt={cakeAlt(cake)}
                className="h-auto"
              />
              <span className="absolute top-2 left-2 rounded-full bg-foreground/75 px-2 py-0.5 text-[11px] font-medium tracking-wide text-background">
                {cakeNumber(cake)}
              </span>
            </button>
          ))}
        </div>
      )}

      {opened && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
          role="dialog"
          aria-label={cakeAlt(opened)}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-background text-foreground"
            aria-label={copy.collection.close}
            onClick={() => setOpen(null)}
          >
            <X className="size-5" />
          </button>
          <img
            src={opened.image}
            alt={cakeAlt(opened)}
            className="max-h-[min(90svh,900px)] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <Link
            to="/collection/$slug"
            params={{ slug: opened.slug }}
            className="absolute bottom-6 left-1/2 inline-flex h-11 -translate-x-1/2 items-center rounded-full bg-background px-5 text-sm text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            {copy.collection.sameCake}
          </Link>
        </div>
      )}
    </main>
  );
}
