import { LOCALES, useCopy, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const locale = useI18n((s) => s.locale);
  const setLocale = useI18n((s) => s.setLocale);
  const copy = useCopy();

  return (
    <div
      role="group"
      aria-label={copy.nav.language}
      className={cn("flex items-center", compact ? "gap-0" : "gap-0.5")}
    >
      {LOCALES.map((item) => {
        const active = locale === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={active}
            aria-label={item.name}
            onClick={() => setLocale(item.id)}
            className={cn(
              "inline-flex h-11 min-w-11 items-center justify-center px-1.5 text-xs tracking-wide transition-colors duration-150",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.short}
          </button>
        );
      })}
    </div>
  );
}
