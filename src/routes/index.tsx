import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CakeImage } from "@/components/cake-image";
import { Button } from "@/components/ui/button";
import { CAKES, FEATURED_SLUGS, VISIT } from "@/lib/catalog";
import { useCopy } from "@/lib/i18n";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const copy = useCopy();
  const featured = FEATURED_SLUGS.map((slug) =>
    CAKES.find((c) => c.slug === slug),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const [heroA, heroB] = copy.home.heroTitle.split("\n");

  return (
    <main>
      <section className="grid min-h-[calc(100svh-4rem)] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-14 md:px-12 lg:px-16">
          <p className="rise font-sans text-xs tracking-kicker text-muted-foreground uppercase">
            {copy.home.kicker}
          </p>
          <h1 className="rise rise-2 mt-5 font-display text-display text-foreground">
            {heroA}
            <br />
            {heroB}
          </h1>
          <p className="rise rise-3 mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            {copy.home.heroLead}
          </p>
          <div className="rise rise-4 mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/order" search={{}}>
                {copy.home.ctaBook}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/collection">{copy.home.ctaCollection}</Link>
            </Button>
          </div>
        </div>
        <div className="relative min-h-[52svh] lg:min-h-0">
          <CakeImage
            src="/cakes/hero.jpg"
            alt={copy.home.heroAlt}
            priority
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[minmax(0,0.9fr)_1.1fr] md:px-8 md:py-24">
          <div>
            <p className="font-sans text-xs tracking-kicker text-muted-foreground uppercase">
              {copy.home.houseKicker}
            </p>
            <h2 className="mt-3 font-display text-title text-foreground">
              {copy.home.houseTitle}
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>{copy.home.houseP1}</p>
            <p>{copy.home.houseP2}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-sans text-xs tracking-kicker text-muted-foreground uppercase">
                {copy.home.collectionKicker}
              </p>
              <h2 className="mt-3 font-display text-title text-foreground">
                {copy.home.collectionTitle}
              </h2>
            </div>
            <Link
              to="/collection"
              className="hidden items-center gap-1 text-sm text-foreground underline-offset-4 hover:underline sm:inline-flex"
            >
              {copy.home.allCakes}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 columns-2 gap-3 md:columns-3">
            {featured.map((cake) => (
              <Link
                key={cake.slug}
                to="/collection/$slug"
                params={{ slug: cake.slug }}
                className="mb-3 block break-inside-avoid overflow-hidden rounded-lg"
              >
                <CakeImage
                  src={cake.image}
                  alt={copy.categories[cake.category]}
                  className="h-auto"
                />
                <p className="mt-2 mb-4 text-sm text-muted-foreground">
                  {copy.categories[cake.category]}
                </p>
              </Link>
            ))}
          </div>
          <Link
            to="/collection"
            className="mt-2 inline-flex items-center gap-1 text-sm text-foreground underline-offset-4 hover:underline sm:hidden"
          >
            {copy.home.allCakes}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div>
            <p className="font-sans text-xs tracking-kicker text-muted-foreground uppercase">
              {copy.home.visitKicker}
            </p>
            <h2 className="mt-3 font-display text-title text-foreground">
              {copy.home.visitTitle}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              {copy.home.visitLead}
            </p>
            <p className="mt-4 text-sm font-medium text-foreground">
              {copy.footer.address}
            </p>
            <a
              className="mt-2 inline-flex items-center gap-1 text-sm text-foreground underline-offset-4 hover:underline"
              href={VISIT.maps}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.footer.directions}
              <ArrowRight className="size-4" />
            </a>
          </div>
          <dl className="space-y-0 divide-y divide-border border-y border-border">
            {copy.footer.hours.map((row) => (
              <div
                key={row.day}
                className="flex items-center justify-between py-3.5"
              >
                <dt className="text-sm text-muted-foreground">{row.day}</dt>
                <dd className="text-sm font-medium text-foreground">
                  {row.time}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center md:px-8 md:py-20">
          <div>
            <h2 className="font-display text-title text-foreground">
              {copy.home.closeTitle}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {copy.home.closeLead}
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/order" search={{}}>
              {copy.home.closeCta}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
