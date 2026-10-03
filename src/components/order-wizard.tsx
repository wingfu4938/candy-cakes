import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CakeImage } from "@/components/cake-image";
import {
  CAKES,
  CATEGORY_IDS,
  CREAM_FLAVORS,
  CREAM_TYPES,
  SINGLE_TIER_SIZES,
  TIERED_SIZES,
  cakeNumber,
  getCake,
  leadDaysFor,
  type CategoryId,
  type CreamId,
  type FlavorId,
  type OrderStepKey,
  type SizeId,
} from "@/lib/catalog";
import {
  cakeCopy,
  creamCopy,
  interpolate,
  sizeCopy,
  tasteCopy,
  tasteNoteCopy,
  useCopy,
} from "@/lib/i18n";
import { type Commission, useOrderStore } from "@/lib/order-store";
import { cn } from "@/lib/utils";

function ChoiceCard({
  selected,
  onSelect,
  title,
  hint,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex min-h-16 w-full items-start justify-between gap-3 rounded-lg border px-4 py-3.5 text-left transition-[border-color,background-color,transform] duration-150 ease-out active:scale-[0.99]",
        selected
          ? "border-foreground bg-card"
          : "border-border bg-transparent hover:border-foreground/35",
      )}
    >
      <span>
        <span className="block font-medium text-foreground">{title}</span>
        <span className="mt-1 block text-sm text-muted-foreground">{hint}</span>
      </span>
    </button>
  );
}

export function OrderWizard({ prefills }: { prefills?: string }) {
  const copy = useCopy();
  const draft = useOrderStore((s) => s.draft);
  const setDraft = useOrderStore((s) => s.setDraft);
  const submitCommission = useOrderStore((s) => s.submitCommission);
  const [stepIdx, setStepIdx] = useState(0);
  const [submitted, setSubmitted] = useState<Commission | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [styleFilter, setStyleFilter] = useState<CategoryId | "all">("all");

  useEffect(() => {
    if (!prefills) return;
    const cake = getCake(prefills);
    if (!cake) return;
    setDraft({ flavor: cake.slug });
    setStyleFilter(cake.category);
  }, [prefills, setDraft]);

  // When coming from a cake detail page ("order this look"), the design is
  // already chosen, so the design step is skipped entirely.
  const designPrefilled = !!(prefills && getCake(prefills));
  const stepKeys: OrderStepKey[] = designPrefilled
    ? ["size", "flavor", "contact"]
    : ["size", "design", "flavor", "contact"];
  const stepKey = stepKeys[stepIdx];

  const lead = leadDaysFor(draft);

  const flavorCake = draft.flavor ? getCake(draft.flavor) : undefined;
  const flavorText = flavorCake ? cakeCopy(copy, flavorCake.slug) : undefined;

  function next() {
    const current = useOrderStore.getState().draft;
    const e: string[] = [];
    if (stepKey === "size" && !current.size) e.push(copy.order.errSize);
    if (stepKey === "design" && !current.flavor) e.push(copy.order.errDesign);
    if (stepKey === "flavor" && !current.cream) e.push(copy.order.errCream);
    if (stepKey === "flavor" && !current.taste) e.push(copy.order.errTaste);
    if (e.length) {
      setErrors(e);
      return;
    }
    setErrors([]);
    setStepIdx((s) => Math.min(s + 1, stepKeys.length - 1));
  }

  function submit() {
    const current = useOrderStore.getState().draft;
    const e: string[] = [];
    if (!current.name.trim()) e.push(copy.order.errName);
    if (!/^[\d\s+-]{8,}$/.test(current.phone.trim())) e.push(copy.order.errPhone);
    if (
      !current.size ||
      !current.flavor ||
      !current.cream ||
      !current.taste
    ) {
      e.push(copy.order.errIncomplete);
    }
    if (e.length) {
      setErrors(e);
      return;
    }
    const result = submitCommission();
    if (result) {
      setSubmitted(result);
      setErrors([]);
    }
  }

  if (submitted) {
    const submittedCake = submitted.flavor
      ? cakeCopy(copy, submitted.flavor)
      : undefined;
    const submittedCakeObj = submitted.flavor
      ? getCake(submitted.flavor)
      : undefined;
    return (
      <div className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)] md:p-10">
        <p className="font-sans text-xs tracking-kicker text-muted-foreground uppercase">
          {copy.order.receivedKicker}
        </p>
        <h2 className="mt-3 font-display text-title text-foreground">
          {interpolate(copy.order.receivedTitle, { name: submitted.name })}
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {copy.order.receivedLead}
        </p>
        <dl className="mt-8 grid gap-3 border-t border-border pt-6 text-sm sm:grid-cols-2">
          <Row
            label={copy.order.rowSize}
            value={
              submitted.size ? sizeCopy(copy, submitted.size).label : undefined
            }
          />
          <Row
            label={copy.order.rowDesign}
            value={
              submittedCakeObj && submittedCake
                ? `No. ${cakeNumber(submittedCakeObj)} · ${submittedCake.name}`
                : undefined
            }
          />
          <Row
            label={copy.order.rowCream}
            value={
              submitted.cream ? creamCopy(copy, submitted.cream) : undefined
            }
          />
          <Row
            label={copy.order.rowTaste}
            value={
              submitted.taste ? tasteCopy(copy, submitted.taste) : undefined
            }
          />
        </dl>
        {submitted.inscription && (
          <p className="mt-4 text-sm text-muted-foreground">
            {interpolate(copy.order.inscriptionLine, {
              text: submitted.inscription,
            })}
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            onClick={() => {
              setSubmitted(null);
              setStepIdx(0);
            }}
          >
            {copy.order.another}
          </Button>
          <Button asChild variant="outline">
            <Link to="/collection">{copy.order.backToCollection}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div>
        <ol className="mb-8 flex gap-1 overflow-x-auto">
          {stepKeys.map((key, i) => (
            <li key={key} className="flex min-w-0 flex-1 items-center gap-1">
              <button
                type="button"
                onClick={() => i < stepIdx && setStepIdx(i)}
                className={cn(
                  "flex h-11 w-full items-center justify-center gap-2 rounded-md px-2 text-xs transition-colors duration-150",
                  i === stepIdx
                    ? "bg-foreground text-background"
                    : i < stepIdx
                      ? "bg-muted text-foreground"
                      : "bg-muted/60 text-muted-foreground",
                )}
              >
                {i < stepIdx ? (
                  <Check className="size-3.5" />
                ) : (
                  <span className="tabular-nums">{i + 1}</span>
                )}
                <span className="hidden sm:inline">{copy.order.steps[key]}</span>
              </button>
            </li>
          ))}
        </ol>

        {stepKey === "size" && (
          <fieldset>
            <legend className="font-display text-title text-foreground">
              {copy.order.howMany}
            </legend>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">
              {copy.order.howManyLead}
            </p>
            <p className="mb-2 text-sm font-medium text-foreground">
              {copy.order.sizeSingle}
            </p>
            <div className="grid gap-2" role="radiogroup">
              {SINGLE_TIER_SIZES.map((s) => {
                const size = sizeCopy(copy, s.id);
                return (
                  <ChoiceCard
                    key={s.id}
                    selected={draft.size === s.id}
                    onSelect={() => setDraft({ size: s.id as SizeId })}
                    title={size.label}
                    hint={size.cm ? `${size.cm} · ${size.servings}` : size.servings}
                  />
                );
              })}
            </div>
            <p className="mt-6 mb-2 text-sm font-medium text-foreground">
              {copy.order.sizeTiered}
            </p>
            <div className="grid gap-2" role="radiogroup">
              {TIERED_SIZES.map((s) => {
                const size = sizeCopy(copy, s.id);
                return (
                  <ChoiceCard
                    key={s.id}
                    selected={draft.size === s.id}
                    onSelect={() => setDraft({ size: s.id as SizeId })}
                    title={size.label}
                    hint={size.servings}
                  />
                );
              })}
            </div>
          </fieldset>
        )}

        {stepKey === "design" && (
          <fieldset>
            <legend className="font-display text-title text-foreground">
              {copy.order.design}
            </legend>
            <p className="mt-2 mb-4 text-sm text-muted-foreground">
              {copy.order.designLead}
            </p>
            <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
              {(["all", ...CATEGORY_IDS] as const).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setStyleFilter(id)}
                  className={cn(
                    "inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-150",
                    styleFilter === id
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  {id === "all" ? copy.collection.all : copy.categories[id]}
                </button>
              ))}
            </div>
            <div
              className="grid max-h-[min(36rem,70svh)] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3"
              role="radiogroup"
            >
              {(styleFilter === "all"
                ? CAKES
                : CAKES.filter((c) => c.category === styleFilter)
              ).map((cake) => {
                const selected = draft.flavor === cake.slug;
                return (
                  <button
                    key={cake.slug}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setDraft({ flavor: cake.slug as FlavorId })}
                    className={cn(
                      "relative overflow-hidden rounded-lg border text-left transition-[border-color] duration-150",
                      selected
                        ? "border-foreground"
                        : "border-border hover:border-foreground/35",
                    )}
                  >
                    <CakeImage
                      src={cake.image}
                      alt={copy.categories[cake.category]}
                      className="h-auto"
                    />
                    <span className="absolute top-1.5 left-1.5 rounded-full bg-foreground/75 px-1.5 py-px text-[10px] font-medium tracking-wide text-background">
                      {cakeNumber(cake)}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {stepKey === "flavor" && (
          <fieldset>
            <legend className="font-display text-title text-foreground">
              {copy.order.taste}
            </legend>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">
              {copy.order.tasteLead}
            </p>
            <p className="mb-2 text-sm font-medium text-foreground">
              {copy.order.creamLabel}
            </p>
            <div className="grid grid-cols-3 gap-2" role="radiogroup">
              {CREAM_TYPES.map((c) => {
                const selected = draft.cream === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() =>
                      setDraft({ cream: c.id as CreamId, taste: null })
                    }
                    className={cn(
                      "rounded-lg border px-3 py-3 text-sm transition-[border-color,background-color] duration-150",
                      selected
                        ? "border-foreground bg-card font-medium text-foreground"
                        : "border-border text-muted-foreground hover:border-foreground/35 hover:text-foreground",
                    )}
                  >
                    {creamCopy(copy, c.id)}
                  </button>
                );
              })}
            </div>
            {draft.cream && (
              <div
                className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3"
                role="radiogroup"
              >
                {CREAM_FLAVORS[draft.cream].map((t) => {
                  const selected = draft.taste === t.id;
                  const note = tasteNoteCopy(copy, t.note);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setDraft({ taste: t.id })}
                      className={cn(
                        "rounded-lg border px-3 py-3 text-left transition-[border-color,background-color] duration-150",
                        selected
                          ? "border-foreground bg-card"
                          : "border-border hover:border-foreground/35",
                      )}
                    >
                      <span className="block text-sm font-medium text-foreground">
                        {tasteCopy(copy, t.id)}
                      </span>
                      {note && (
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {note}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </fieldset>
        )}

        {stepKey === "contact" && (
          <div>
            <h2 className="font-display text-title text-foreground">
              {copy.order.contact}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={copy.order.name} htmlFor="name">
                <Input
                  id="name"
                  value={draft.name}
                  autoComplete="name"
                  onChange={(e) => setDraft({ name: e.target.value })}
                />
              </Field>
              <Field label={copy.order.phone} htmlFor="phone">
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={draft.phone}
                  onChange={(e) => setDraft({ phone: e.target.value })}
                />
              </Field>
              <Field label={copy.order.email} htmlFor="email">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={draft.email}
                  onChange={(e) => setDraft({ email: e.target.value })}
                />
              </Field>
              <div className="sm:col-span-2">
                <p className="mb-2 text-sm font-medium">{copy.order.delivery}</p>
                <p className="rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground">
                  {copy.order.pickup}
                </p>
              </div>
              <Field label={copy.order.inscription} htmlFor="inscription">
                <Input
                  id="inscription"
                  maxLength={24}
                  placeholder={copy.order.inscriptionPh}
                  value={draft.inscription}
                  onChange={(e) => setDraft({ inscription: e.target.value })}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label={copy.order.notes} htmlFor="notes">
                  <Textarea
                    id="notes"
                    value={draft.notes}
                    onChange={(e) => setDraft({ notes: e.target.value })}
                    placeholder={copy.order.notesPh}
                  />
                </Field>
              </div>
            </div>
          </div>
        )}

        {errors.length > 0 && (
          <ul className="mt-5 space-y-1 text-sm text-destructive">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            disabled={stepIdx === 0}
            onClick={() => {
              setErrors([]);
              setStepIdx((s) => Math.max(0, s - 1));
            }}
          >
            <ArrowLeft className="size-4" />
            {copy.order.back}
          </Button>
          {stepIdx < stepKeys.length - 1 ? (
            <Button type="button" onClick={next}>
              {copy.order.next}
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button type="button" onClick={submit}>
              {copy.order.send}
            </Button>
          )}
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 h-fit rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <p className="font-sans text-xs tracking-kicker text-muted-foreground uppercase">
          {copy.order.summary}
        </p>
        {flavorCake && flavorText && (
          <div className="mt-4 overflow-hidden rounded-md">
            <div className="aspect-3/4 max-h-56">
              <CakeImage src={flavorCake.image} alt={flavorText.name} />
            </div>
          </div>
        )}
        <dl className="mt-4 space-y-2.5 text-sm">
          <Row
            label={copy.order.rowSize}
            value={
              draft.size ? sizeCopy(copy, draft.size).label : copy.order.unset
            }
          />
          <Row
            label={copy.order.rowDesign}
            value={
              flavorCake && flavorText
                ? `No. ${cakeNumber(flavorCake)} · ${flavorText.name}`
                : copy.order.unset
            }
          />
          <Row
            label={copy.order.rowCream}
            value={
              draft.cream ? creamCopy(copy, draft.cream) : copy.order.unset
            }
          />
          <Row
            label={copy.order.rowTaste}
            value={
              draft.taste ? tasteCopy(copy, draft.taste) : copy.order.unset
            }
          />
          <Row
            label={copy.order.estimate}
            value={interpolate(copy.collection.leadDays, { n: lead })}
          />
        </dl>
      </aside>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value ?? "—"}</dd>
    </div>
  );
}
