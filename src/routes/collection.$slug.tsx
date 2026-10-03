import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CakeImage } from "@/components/cake-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CAKES, SIZES, cakeNumber, getCake, sizePrice } from "@/lib/catalog";
import { sizeCopy, useCopy, useLocale } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";

export const Route = createFileRoute("/collection/$slug")({
  loader: ({ params }) => {
    const cake = getCake(params.slug);
    if (!cake) throw notFound();
    return cake;
  },
  component: CakeDetail,
});

function CakeDetail() {
  const cake = Route.useLoaderData();
  const copy = useCopy();
  const locale = useLocale();
  const label = copy.categories[cake.category];
  const others = CAKES.filter(
    (item) => item.category === cake.category && item.slug !== cake.slug,
  ).slice(0, 6);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-16">
      <Link
        to="/collection"
        className="inline-flex h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {copy.collection.back}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_0.95fr] lg:gap-16">
        <div className="overflow-hidden rounded-xl">
          <CakeImage src={cake.image} alt={label} priority className="h-auto" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-2">
            <Badge>{label}</Badge>
            {cake.theme && <Badge variant="outline">{copy.themes[cake.theme]}</Badge>}
            <Badge variant="outline">No. {cakeNumber(cake)}</Badge>
          </div>
          <h1 className="mt-4 font-display text-display text-foreground">
            {label}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {copy.collection.lead}
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">
                    {copy.collection.size}
                  </th>
                  <th className="px-4 py-2.5 text-left font-medium">
                    {copy.collection.serves}
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium">
                    {copy.collection.basePrice}
                  </th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((s) => {
                  const size = sizeCopy(copy, s.id);
                  return (
                    <tr key={s.id} className="border-t border-border">
                      <td className="px-4 py-2.5">{size.label}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {size.servings}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums">
                        {formatPrice(sizePrice(s.id), locale)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/order" search={{ cake: cake.slug }}>
                {copy.collection.sameCake}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/visit">{copy.collection.talk}</Link>
            </Button>
          </div>
        </div>
      </div>

      {others.length > 0 && (
        <section className="mt-20 border-t border-border pt-12">
          <h2 className="font-display text-title text-foreground">
            {copy.collection.others}
          </h2>
          <div className="mt-8 columns-2 gap-3 sm:columns-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                to="/collection/$slug"
                params={{ slug: item.slug }}
                className="mb-3 block break-inside-avoid overflow-hidden rounded-lg"
              >
                <CakeImage
                  src={item.image}
                  alt={copy.categories[item.category]}
                  className="h-auto"
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
