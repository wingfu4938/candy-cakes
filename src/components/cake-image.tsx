import { cn } from "@/lib/utils";

export function CakeImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  // Derive WebP path: /cakes/hero.jpg -> /cakes/hero.webp
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  return (
    <picture className={cn("block h-full w-full", className)}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={cn("framed h-full w-full object-cover", className)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
