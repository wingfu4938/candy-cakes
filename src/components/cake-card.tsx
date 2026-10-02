import { Link } from "@tanstack/react-router";
import { CakeImage } from "@/components/cake-image";
import type { Cake } from "@/lib/catalog";
import { useCopy } from "@/lib/i18n";

export function CakeCard({ cake }: { cake: Cake }) {
  const copy = useCopy();

  return (
    <Link
      to="/collection/$slug"
      params={{ slug: cake.slug }}
      className="group block break-inside-avoid"
    >
      <div className="overflow-hidden rounded-lg">
        <CakeImage
          src={cake.image}
          alt={copy.categories[cake.category]}
          className="h-auto"
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {copy.categories[cake.category]}
      </p>
    </Link>
  );
}
