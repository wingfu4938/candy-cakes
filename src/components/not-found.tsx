import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/lib/i18n";

export function NotFound() {
  const copy = useCopy();
  return (
    <main className="flex min-h-[70svh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-sans text-xs tracking-kicker text-muted-foreground uppercase">
        404
      </p>
      <h1 className="font-display text-title text-foreground">
        {copy.notFound.title}
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        {copy.notFound.lead}
      </p>
      <div className="mt-2 flex gap-3">
        <Button asChild>
          <Link to="/collection">{copy.notFound.collection}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/">{copy.notFound.home}</Link>
        </Button>
      </div>
    </main>
  );
}
