import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CakeImage } from "@/components/cake-image";
import { VISIT } from "@/lib/catalog";
import { interpolate, useCopy } from "@/lib/i18n";
import { useChatStore } from "@/lib/chat-store";
import { useOrderStore } from "@/lib/order-store";

export const Route = createFileRoute("/visit")({ component: Visit });

function Visit() {
  const copy = useCopy();
  const submitInquiry = useOrderStore((s) => s.submitInquiry);
  const openChat = useChatStore((s) => s.setOpen);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^[\d\s+-]{8,}$/.test(phone.trim())) {
      setError(copy.visit.error);
      return;
    }
    submitInquiry({
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });
    setDone(true);
    setError("");
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-5 py-12 md:grid-cols-2 md:px-8 md:py-16">
      <div>
        <p className="font-sans text-xs tracking-kicker text-muted-foreground uppercase">
          {copy.visit.kicker}
        </p>
        <h1 className="mt-3 font-display text-display text-foreground">
          {copy.visit.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {copy.visit.lead}
        </p>
        <dl className="mt-10 space-y-5 text-sm">
          <div>
            <dt className="text-muted-foreground">{copy.visit.addressLabel}</dt>
            <dd className="mt-1">
              <a
                className="text-foreground underline-offset-4 hover:underline"
                href={VISIT.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.visit.address}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{copy.visit.hoursLabel}</dt>
            <dd className="mt-1 text-foreground">{copy.visit.hours}</dd>
            <dd className="mt-1 text-muted-foreground">{copy.visit.note}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{copy.visit.contactLabel}</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              <Button asChild>
                <a
                  href={VISIT.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.chat.facebookCta}
                </a>
              </Button>
              <Button type="button" variant="outline" onClick={() => openChat(true)}>
                {copy.chat.open}
              </Button>
            </dd>
          </div>
        </dl>
        <div className="mt-10 overflow-hidden rounded-xl">
          <div className="aspect-4/3">
            <CakeImage src="/cakes/gallery/fruit-001.jpg" alt={copy.visit.cakeAlt} />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)] md:p-8">
        {done ? (
          <div>
            <p className="font-sans text-xs tracking-kicker text-muted-foreground uppercase">
              {copy.visit.doneKicker}
            </p>
            <h2 className="mt-3 font-display text-title text-foreground">
              {interpolate(copy.visit.doneTitle, { name })}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {copy.visit.doneLead}
            </p>
            <Button
              className="mt-8"
              variant="outline"
              onClick={() => setDone(false)}
            >
              {copy.visit.again}
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-5">
            <div>
              <h2 className="font-display text-title text-foreground">
                {copy.visit.formTitle}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {copy.visit.formLead}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="visit-name">{copy.visit.name}</Label>
              <Input
                id="visit-name"
                value={name}
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="visit-phone">{copy.visit.phone}</Label>
              <Input
                id="visit-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="visit-msg">{copy.visit.message}</Label>
              <Textarea
                id="visit-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={copy.visit.messagePh}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit">{copy.visit.send}</Button>
          </form>
        )}
      </div>
    </main>
  );
}
