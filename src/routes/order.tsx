import { createFileRoute } from "@tanstack/react-router";
import { OrderWizard } from "@/components/order-wizard";
import { useCopy } from "@/lib/i18n";

type OrderSearch = {
  cake?: string;
};

export const Route = createFileRoute("/order")({
  validateSearch: (search: Record<string, unknown>): OrderSearch => {
    if (typeof search.cake === "string" && search.cake.length > 0) {
      return { cake: search.cake };
    }
    return {};
  },
  component: OrderPage,
});

function OrderPage() {
  const { cake } = Route.useSearch();
  const copy = useCopy();

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <p className="font-sans text-xs tracking-kicker text-muted-foreground uppercase">
        {copy.order.kicker}
      </p>
      <h1 className="mt-3 font-display text-display text-foreground">
        {copy.order.title}
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        {copy.order.lead}
      </p>
      <div className="mt-10">
        <OrderWizard prefills={cake} />
      </div>
    </main>
  );
}
