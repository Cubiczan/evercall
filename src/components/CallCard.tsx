import TestCallButton from "./TestCallButton";
import type { CallRecord } from "@/lib/types";

export default function CallCard({ call }: { call: CallRecord }) {
  const statusLabel: Record<CallRecord["status"], string> = {
    scheduled: "Scheduled",
    in_progress: "Call in progress…",
    completed: "Completed today",
    missed: "Missed — retrying",
  };

  return (
    <section className="card">
      <h2>📞 Today&apos;s Call</h2>
      <div className="big-stat">{call.recipient}</div>
      <div className="pill positive">{statusLabel[call.status]}</div>
      <div className="kv">
        <span className="k">Mode</span>
        <span className="v">{call.mode === "demo" ? "🖥️ Demo" : "☎️ Phone"}</span>
      </div>
      <div className="kv">
        <span className="k">Lasted</span>
        <span className="v">
          {call.durationSec ? `${Math.round(call.durationSec / 60)} min` : "—"}
        </span>
      </div>
      <TestCallButton />
    </section>
  );
}
