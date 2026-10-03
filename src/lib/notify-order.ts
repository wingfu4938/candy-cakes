import { createServerFn } from "@tanstack/react-start";

/**
 * Server-only: email the shop owner when a customer submits an order.
 *
 * Uses Resend's REST API directly (no SDK). Env:
 * - RESEND_API_KEY (required) — server env var on Vercel
 * - ORDER_NOTIFY_EMAIL (optional) — defaults to the owner's inbox
 *
 * NOTE: with no verified domain, Resend only delivers from
 * `onboarding@resend.dev` to the Resend account owner's own address,
 * which is exactly this use case (owner notifies themselves).
 */

const RESEND_API = "https://api.resend.com/emails";
const DEFAULT_NOTIFY_EMAIL = "yongfu4938@outlook.com";

function env(key: string): string | undefined {
  const v = process.env[key]?.trim();
  return v || undefined;
}

export type OrderNotifyInput = {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  cakeLabel: string;
  /** Gallery slug, e.g. "kids-027" — used to embed the design photo. */
  flavorSlug: string;
  sizeLabel: string;
  creamLabel: string;
  tasteLabel: string;
  inscription: string;
  notes: string;
  pickupHint: string;
  locale: string;
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(labelZh: string, labelEn: string, value: string): string {
  if (!value.trim()) return "";
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#888;font-size:13px;white-space:nowrap;">${labelZh}<br><span style="font-size:11px;">${labelEn}</span></td>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:14px;">${esc(value)}</td>
  </tr>`;
}

export const notifyOrderFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as OrderNotifyInput)
  .handler(async ({ data }) => {
    const apiKey = env("RESEND_API_KEY");
    const to = env("ORDER_NOTIFY_EMAIL") ?? DEFAULT_NOTIFY_EMAIL;
    if (!apiKey) {
      console.warn("[notify-order] RESEND_API_KEY not set — skipping email");
      return { ok: false, reason: "missing-api-key" as const };
    }

    const subject = `新订单 ${data.orderId} · ${data.customerName} · ${data.cakeLabel}`;
    const siteUrl = env("SITE_URL") ?? "https://candy-cakes-six-moon.vercel.app";
    const cakeImg = data.flavorSlug
      ? `<p style="margin:12px 0;"><img src="${siteUrl}/cakes/gallery/${esc(data.flavorSlug)}.jpg" alt="${esc(data.cakeLabel)}" style="max-width:100%;border-radius:8px;"></p>`
      : "";
    const html = `<div style="font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;max-width:560px;margin:0 auto;">
  <h2 style="font-size:18px;">🎂 有新的蛋糕订单 New cake order</h2>
  <p style="color:#888;font-size:13px;">订单号 Order ${esc(data.orderId)} · ${esc(data.createdAt)} · 页面语言 ${esc(data.locale)}</p>
  ${cakeImg}
  <table style="width:100%;border-collapse:collapse;margin-top:12px;">
    ${row("客人姓名", "Name", data.customerName)}
    ${row("电话", "Phone", data.customerPhone)}
    ${row("邮箱", "Email", data.customerEmail)}
    ${row("蛋糕款式", "Design", data.cakeLabel)}
    ${row("尺寸", "Size", data.sizeLabel)}
    ${row("奶油种类", "Cream", data.creamLabel)}
    ${row("口味", "Flavor", data.tasteLabel)}
    ${row("蛋糕上的字", "Inscription", data.inscription)}
    ${row("备注", "Notes", data.notes)}
    ${row("取货", "Pickup", data.pickupHint)}
  </table>
  <p style="color:#888;font-size:12px;margin-top:16px;">请在一个工作日内联系客人确认档期。<br>Please contact the customer within one working day to confirm.</p>
</div>`;

    const res = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Candy Cakes <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[notify-order] resend failed", res.status, body.slice(0, 300));
      return { ok: false, reason: "resend-error" as const, status: res.status };
    }
    return { ok: true as const };
  });
