import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { deleteTestOrdersFn } from "@/lib/orders-server";

// TEMPORARY: one-off cleanup of the 2026-10-04 slot-limit test orders.
// Delete this file after use.
export const Route = createFileRoute("/admin-cleanup")({
  component: AdminCleanupPage,
});

function AdminCleanupPage() {
  const [status, setStatus] = useState("running…");
  useEffect(() => {
    deleteTestOrdersFn({ data: { confirm: "delete-test-orders" } })
      .then((r) => {
        setStatus(
          r.ok ? `done, deleted ${r.deleted} test order(s)` : `failed: ${r.reason}`,
        );
      })
      .catch((err) => setStatus(`error: ${String(err)}`));
  }, []);
  return (
    <div style={{ padding: 40, fontFamily: "monospace" }}>
      <h1>admin cleanup</h1>
      <p>{status}</p>
    </div>
  );
}
