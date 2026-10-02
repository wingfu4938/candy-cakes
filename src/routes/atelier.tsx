import { Link, createFileRoute } from "@tanstack/react-router";
import { CakeImage } from "@/components/cake-image";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/lib/i18n";

export const Route = createFileRoute("/atelier")({ component: Atelier });

function Atelier() {
  const copy = useCopy();

  return (
    <main>
      <section className="relative min-h-[48svh] md:min-h-[56svh]">
        <CakeImage
          src="/cakes/hero.jpg"
          alt={copy.atelier.heroAlt}
          priority
          className="absolute inset-0 h-full w-full object-right"
        />
        <div className="absolute inset-0 bg-foreground/45" />
        <div className="relative mx-auto flex min-h-[48svh] max-w-6xl items-end px-5 py-12 md:min-h-[56svh] md:px-8 md:py-16">
          <div>
            <p className="font-sans text-xs tracking-kicker text-background/80 uppercase">
              {copy.atelier.kicker}
            </p>
            <h1 className="mt-3 font-display text-display text-background">
              {copy.atelier.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-24">
        <div>
          <p className="font-sans text-xs tracking-kicker text-muted-foreground uppercase">
            {copy.atelier.role}
          </p>
          <h2 className="mt-3 font-display text-title text-foreground">
            {copy.atelier.chef}
          </h2>
        </div>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          {copy.atelier.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3 md:px-8 md:py-24">
          {copy.atelier.values.map((v) => (
            <div key={v.title}>
              <h3 className="font-display text-2xl text-foreground">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="overflow-hidden rounded-lg sm:col-span-2">
            <div className="aspect-4/3 sm:aspect-video">
              <CakeImage
                src="/cakes/gallery/wed-001.jpg"
                alt={copy.categories.wed}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-lg">
              <div className="aspect-4/3">
                <CakeImage src="/cakes/gallery/pipe-001.jpg" alt={copy.categories.pipe} />
              </div>
            </div>
            <div className="overflow-hidden rounded-lg">
              <div className="aspect-4/3">
                <CakeImage
                  src="/cakes/gallery/kids-001.jpg"
                  alt={copy.categories.kids}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {copy.atelier.visitLead}
          </p>
          <Button asChild>
            <Link to="/visit">{copy.atelier.visitCta}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
