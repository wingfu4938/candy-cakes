import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { BrandLockup } from "@/components/mark";
import { Button } from "@/components/ui/button";
import { LanguageSwitch } from "@/components/language-switch";
import { FacebookChat } from "@/components/facebook-chat";
import { I18nBoot, useCopy } from "@/lib/i18n";
import { VISIT } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const copy = useCopy();
  const year = new Date().getFullYear();

  const nav = [
    { to: "/collection" as const, label: copy.nav.collection },
    { to: "/order" as const, label: copy.nav.order },
  ];

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <I18nBoot />
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 md:px-8">
          <Link to="/" onClick={() => setOpen(false)} className="shrink-0">
            <BrandLockup />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="inline-flex h-11 items-center px-3.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitch />
            <Button asChild size="sm" className="ml-1">
              <Link to="/order" search={{}}>
                {copy.nav.book}
              </Link>
            </Button>
          </nav>
          <div className="flex items-center lg:hidden">
            <LanguageSwitch compact />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md text-foreground"
              aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <div
          className={cn(
            "border-t border-border bg-background lg:hidden",
            open ? "block" : "hidden",
          )}
        >
          <nav className="flex flex-col px-5 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center text-base text-foreground"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2 mb-3 w-full">
              <Link to="/order" search={{}} onClick={() => setOpen(false)}>
                {copy.nav.book}
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-3 md:px-8 md:py-16">
          <div>
            <BrandLockup />
          </div>
          <div>
            <p className="font-sans text-xs tracking-kicker text-muted-foreground uppercase">
              {copy.footer.book}
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              <a
                className="text-foreground underline-offset-4 hover:underline"
                href={VISIT.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.chat.facebookCta}
              </a>
            </p>
            <div className="mt-5 flex gap-4 text-sm text-muted-foreground">
              <Link to="/collection" className="hover:text-foreground">
                {copy.nav.collection}
              </Link>
              <Link to="/order" search={{}} className="hover:text-foreground">
                {copy.nav.order}
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border">
          <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-muted-foreground md:px-8">
            © {year} Candy Cakes · {copy.footer.copyright}
          </p>
        </div>
      </footer>
      <FacebookChat />
    </div>
  );
}
