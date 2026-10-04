-- Shop orders ledger: every submitted order is recorded here so the server
-- can enforce per-slot pickup capacity (prevents 7 customers at 5pm).
CREATE TABLE IF NOT EXISTS shop_orders (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  cake_label TEXT NOT NULL,
  flavor_slug TEXT NOT NULL,
  size_label TEXT NOT NULL,
  cream_label TEXT NOT NULL,
  taste_label TEXT NOT NULL,
  cake_name TEXT NOT NULL DEFAULT '',
  cake_age TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  pickup_date DATE NOT NULL,
  pickup_time TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'zh'
);
CREATE INDEX IF NOT EXISTS shop_orders_pickup_idx
  ON shop_orders (pickup_date, pickup_time);
