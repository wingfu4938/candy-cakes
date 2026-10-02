import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { CakeImage } from "@/components/cake-image";
import { CAKES, CATEGORY_IDS, type CategoryId } from "@/lib/catalog";
import { useCopy } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/collection/")({ component: Collection });

function Collection() {
  const copy = useCopy();
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const cakes =
    filter === "all" ? CAKES : CAKES.filter((c) => c.category === filter);
  const opened = open ? CAKES.find((c) => c.slug === open) : undefined;

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
            onClick={() => setFilter(f.id)}
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
              className="mb-2 block w-full break-inside-avoid overflow-hidden rounded-lg md:mb-3"
            >
              <CakeImage
                src={cake.image}
                alt={copy.categories[cake.category]}
                className="h-auto"
              />
            </button>
          ))}
        </div>
      )}

      {opened && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
          role="dialog"
          aria-label={copy.categories[opened.category]}
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
            alt={copy.categories[opened.category]}
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
