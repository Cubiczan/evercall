"use client";

import { useState } from "react";

/** Triggers POST /api/call — the one interaction judges will actually click.
 *  W2 note: after the orchestrator exists, this should also open the
 *  WS /api/realtime live view for the in-dashboard transcript. */
export default function TestCallButton() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function trigger() {
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "demo", recipient: "ruth" }),
      });
      const data = (await res.json()) as { callId?: string; status?: string };
      setResult(
        res.ok
          ? `Calling… (${data.callId ?? "no id"})`
          : "Could not start the call — is the orchestrator wired?"
      );
    } catch {
      setResult("Network error — try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button className="cta" onClick={trigger} disabled={busy}>
        {busy ? "Dialing…" : "▶ Trigger test call"}
      </button>
      {result && (
        <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{result}</p>
      )}
    </>
  );
}
