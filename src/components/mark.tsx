import { cn } from "@/lib/utils";

export function CamelliaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 7.2c1.6 2.4 2 5.1 1.2 7.2 2.1-.7 4.6-.3 6.6 1.2-1.1 2.7-3.4 4.4-5.7 4.6 1.4 1.7 1.7 4.2.6 6.4-2.6-.8-4.6-2.7-5.4-4.8-.8 2.1-2.8 4-5.4 4.8-1.1-2.2-.8-4.7.6-6.4-2.3-.2-4.6-1.9-5.7-4.6 2-1.5 4.5-1.9 6.6-1.2-.8-2.1-.4-4.8 1.2-7.2 1.4 1.1 2.6 1.1 4 0Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16.4" r="2.1" fill="currentColor" />
    </svg>
  );
}

export function BrandLockup({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5 text-foreground", className)}>
      <CamelliaMark className="size-7" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-base tracking-wide">
          Candy Cakes
        </span>
        {!compact && (
          <span className="mt-0.5 font-sans text-xs tracking-kicker text-muted-foreground uppercase">
            Hamilton
          </span>
        )}
      </span>
    </span>
  );
}
