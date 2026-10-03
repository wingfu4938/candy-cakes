import { useEffect, useMemo, useState } from "react";
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
  FINISHES,
  OCCASION_IDS,
  SINGLE_TIER_SIZES,
  TIERED_SIZES,
  cakeNumber,
  getCake,
  leadDaysFor,
  occasionFor,
  type CategoryId,
  type CreamId,
  type FinishId,
  type FlavorId,
  type OccasionId,
  type SizeId,
} from "@/lib/catalog";
import {
  cakeCopy,
  creamCopy,
  finishCopy,
  interpolate,
  occasionCopy,
  sizeCopy,
  tasteCopy,
  tasteNoteCopy,
  useCopy,
  useLocale,
} from "@/lib/i18n";
import { type Commission, useOrderStore } from "@/lib/order-store";
import { cn, formatDate, toDateInput } from "@/lib/utils";

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
  const locale = useLocale();
  const draft = useOrderStore((s) => s.draft);
  const setDraft = useOrderStore((s) => s.setDraft);
  const submitCommission = useOrderStore((s) => s.submitCommission);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<Commission | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [styleFilter, setStyleFilter] = useState<CategoryId | "all">("all");

  useEffect(() => {
    if (!prefills) return;
    const cake = getCake(prefills);
    if (!cake) return;
    setDraft({
      flavor: cake.slug,
      occasion: occasionFor(cake.category),
    });
    setStyleFilter(cake.category);
  }, [prefills, setDraft]);

  const lead = leadDaysFor(draft);
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + lead);
    return toDateInput(d);
  }, [lead]);

  const flavorCake = draft.flavor ? getCake(draft.flavor) : undefined;
  const flavorText = flavorCake ? cakeCopy(copy, flavorCake.slug) : undefined;
  const steps = copy.order.steps;

  function next() {
    const current = useOrderStore.getState().draft;
    const e: string[] = [];
    if (step === 0 && !current.occasion) e.push(copy.order.errOccasion);
    if (step === 1 && !current.size) e.push(copy.order.errSize);
    if (step === 2 && !current.flavor) e.push(copy.order.errDesign);
    if (step === 3 && !current.cream) e.push(copy.order.errCream);
    if (step === 3 && !current.taste) e.push(copy.order.errTaste);
    if (step === 4 && !current.finish) e.push(copy.order.errFinish);
    if (e.length) {
      setErrors(e);
      return;
    }
    setErrors([]);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function submit() {
    const current = useOrderStore.getState().draft;
    const e: string[] = [];
    if (!current.name.trim()) e.push(copy.order.errName);
    if (!/^[\d\s+-]{8,}$/.test(current.phone.trim())) e.push(copy.order.errPhone);
    if (!current.date) e.push(copy.order.errDate);
    if (current.date && current.date < minDate) {
      e.push(
        interpolate(copy.order.errLead, {
          n: lead,
          date: formatDate(minDate, locale),
        }),
      );
    }
    if (
      !current.occasion ||
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
            label={copy.order.rowOccasion}
            value={
              submitted.occasion
                ? occasionCopy(copy, submitted.occasion).label
                : undefined
            }
          />
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
          <Row
            label={copy.order.rowFinish}
            value={
              submitted.finish
                ? finishCopy(copy, submitted.finish).label
                : undefined
            }
          />
          <Row
            label={copy.order.rowDate}
            value={formatDate(submitted.date, locale)}
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
              setStep(0);
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
          {steps.map((label, i) => (
            <li key={label} className="flex min-w-0 flex-1 items-center gap-1">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "flex h-11 w-full items-center justify-center gap-2 rounded-md px-2 text-xs transition-colors duration-150",
                  i === step
                    ? "bg-foreground text-background"
                    : i < step
                      ? "bg-muted text-foreground"
                      : "bg-muted/60 text-muted-foreground",
                )}
              >
                {i < step ? (
                  <Check className="size-3.5" />
                ) : (
                  <span className="tabular-nums">{i + 1}</span>
                )}
                <span className="hidden sm:inline">{label}</span>
              </button>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <fieldset>
            <legend className="font-display text-title text-foreground">
              {copy.order.forWhom}
            </legend>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">
              {copy.order.forWhomLead}
            </p>
            <div className="grid gap-2" role="radiogroup">
              {OCCASION_IDS.map((id) => {
                const o = occasionCopy(copy, id);
                return (
                  <ChoiceCard
                    key={id}
                    selected={draft.occasion === id}
                    onSelect={() => setDraft({ occasion: id as OccasionId })}
                    title={o.label}
                    hint={o.hint}
                  />
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 1 && (
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

        {step === 2 && (
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

        {step === 3 && (
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

        {step === 4 && (
          <fieldset>
            <legend className="font-display text-title text-foreground">
              {copy.order.finish}
            </legend>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">
              {copy.order.finishLead}
            </p>
            <div className="grid gap-2" role="radiogroup">
              {FINISHES.map((f) => {
                const finish = finishCopy(copy, f.id);
                return (
                  <ChoiceCard
                    key={f.id}
                    selected={draft.finish === f.id}
                    onSelect={() => setDraft({ finish: f.id as FinishId })}
                    title={finish.label}
                    hint={finish.hint}
                  />
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 5 && (
          <div>
            <h2 className="font-display text-title text-foreground">
              {copy.order.yourDay}
            </h2>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">
              {interpolate(copy.order.earliest, {
                date: formatDate(minDate, locale),
              })}
            </p>
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
              <Field label={copy.order.date} htmlFor="date">
                <Input
                  id="date"
                  type="date"
                  min={minDate}
                  value={draft.date}
                  onChange={(e) => setDraft({ date: e.target.value })}
                />
              </Field>
              <div className="sm:col-span-2">
                <p className="mb-2 text-sm font-medium">{copy.order.delivery}</p>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      ["pickup", copy.order.pickup],
                      ["delivery", copy.order.courier],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setDraft({ delivery: id })}
                      className={cn(
                        "h-11 rounded-md border text-sm transition-colors duration-150",
                        draft.delivery === id
                          ? "border-foreground bg-card"
                          : "border-border hover:border-foreground/35",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
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
            disabled={step === 0}
            onClick={() => {
              setErrors([]);
              setStep((s) => Math.max(0, s - 1));
            }}
          >
            <ArrowLeft className="size-4" />
            {copy.order.back}
          </Button>
          {step < steps.length - 1 ? (
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
            label={copy.order.rowOccasion}
            value={
              draft.occasion
                ? occasionCopy(copy, draft.occasion).label
                : copy.order.unset
            }
          />
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
            label={copy.order.rowFinish}
            value={
              draft.finish
                ? finishCopy(copy, draft.finish).label
                : copy.order.unset
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
