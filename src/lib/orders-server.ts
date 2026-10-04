import { createServerFn } from "@tanstack/react-start";
import { getSql, dbSource } from "./db";
import { MAX_ORDERS_PER_SLOT, SLOT_MINUTES, bucketFor } from "./catalog";

/**
 * Server-only: pickup slot ledger.
 *
 * Every submitted order is recorded in `shop_orders` so the server can
 * enforce per-slot pickup capacity. Slots are 30-minute buckets (see
 * catalog.ts); MAX_ORDERS_PER_SLOT caps how many orders share one bucket.
 *
 * NOTE: counts are only reliable on a persistent backend (Neon, i.e.
 * DATABASE_URL set). On the PGLite fallback each serverless instance has
 * its own embedded DB, so counts may under-report — the owner still
 * confirms every order in Messenger.
 */

/** "17:00" -> "17:30" (bucket end, exclusive). */
function bucketEnd(bucket: string): string {
  const [h, m] = bucket.split(":").map(Number);
  const total = h * 60 + m + SLOT_MINUTES;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export type OrderRecord = {
  orderId: string;
  customerName: string;
  customerPhone: string;
  cakeLabel: string;
  flavorSlug: string;
  sizeLabel: string;
  creamLabel: string;
  tasteLabel: string;
  cakeName: string;
  cakeAge: string;
  notes: string;
  pickupDate: string; // YYYY-MM-DD
  pickupTime: string; // HH:MM
  locale: string;
};

/**
 * How many orders already sit in each 30-min bucket of a given date.
 * Returns { counts: { "17:00": 2, ... }, capacity, dbSource }.
 */
export const getSlotCountsFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as { date: string })
  .handler(async ({ data }) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
      return { counts: {} as Record<string, number>, capacity: MAX_ORDERS_PER_SLOT, dbSource };
    }
    const sql = await getSql();
    const rows = await sql<{ pickup_time: string; n: number }>`
      SELECT pickup_time, COUNT(*)::int AS n
      FROM shop_orders
      WHERE pickup_date = ${data.date}::date
      GROUP BY pickup_time
    `;
    const counts: Record<string, number> = {};
    for (const r of rows) {
      const b = bucketFor(r.pickup_time);
      counts[b] = (counts[b] ?? 0) + r.n;
    }
    return { counts, capacity: MAX_ORDERS_PER_SLOT, dbSource };
  });

/**
 * Record an order, enforcing slot capacity atomically: the INSERT only
 * happens when the order's 30-min bucket still has room (single statement,
 * so two simultaneous submissions can't both slip through).
 * Returns { ok: true } or { ok: false, reason: "slot-full" }.
 */
export const createOrderFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as OrderRecord)
  .handler(async ({ data }) => {
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(data.pickupDate) ||
      !/^\d{2}:\d{2}$/.test(data.pickupTime) ||
      !data.orderId ||
      !data.customerName.trim() ||
      !data.customerPhone.trim()
    ) {
      return { ok: false as const, reason: "invalid" as const };
    }
    const bucket = bucketFor(data.pickupTime);
    const end = bucketEnd(bucket);
    const sql = await getSql();
    const rows = await sql<{ id: string }>`
      INSERT INTO shop_orders (
        id, customer_name, customer_phone, cake_label, flavor_slug,
        size_label, cream_label, taste_label, cake_name, cake_age,
        notes, pickup_date, pickup_time, locale
      )
      SELECT
        ${data.orderId}, ${data.customerName}, ${data.customerPhone},
        ${data.cakeLabel}, ${data.flavorSlug}, ${data.sizeLabel},
        ${data.creamLabel}, ${data.tasteLabel}, ${data.cakeName},
        ${data.cakeAge}, ${data.notes},
        ${data.pickupDate}::date, ${data.pickupTime}, ${data.locale}
      WHERE (
        SELECT COUNT(*)
        FROM shop_orders
        WHERE pickup_date = ${data.pickupDate}::date
          AND pickup_time >= ${bucket}
          AND pickup_time < ${end}
      ) < ${MAX_ORDERS_PER_SLOT}
      RETURNING id
    `;
    if (rows.length === 0) {
      return { ok: false as const, reason: "slot-full" as const };
    }
    return { ok: true as const };
  });
