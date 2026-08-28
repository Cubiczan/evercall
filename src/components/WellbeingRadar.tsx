import type { WellbeingReport } from "@/lib/types";

/** The heart of the dashboard: today's wellbeing signals from LeMUR. */
export default function WellbeingRadar({ report }: { report: WellbeingReport }) {
  const moodPill =
    report.mood.label === "positive"
      ? "positive"
      : report.mood.label === "concerning"
        ? "urgent"
        : "warning";

  return (
    <section className="card">
      <h2>🧠 Wellbeing Radar</h2>
      <span className={`pill ${moodPill}`}>
        {report.mood.label} · {Math.round(report.mood.score * 100)}%
      </span>
      <div className="kv">
        <span className="k">Meds taken</span>
        <span className={`v ${report.medsTaken ? "ok" : "warn"}`}>
          {report.medsTaken ? "✅ Yes" : "⚠️ Not mentioned"}
        </span>
      </div>
      <div className="kv">
        <span className="k">Memory slips</span>
        <span className={`v ${report.memorySlips > 1 ? "warn" : "ok"}`}>
          {report.memorySlips}
        </span>
      </div>
      <div className="kv">
        <span className="k">Caregiver joined</span>
        <span className="v ok">{report.caregiverJoined ? "✅ Yes (diarized)" : "—"}</span>
      </div>
      {report.memorySlipDetail && (
        <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
          🔍 {report.memorySlipDetail}
        </p>
      )}
      <p style={{ fontSize: "0.95rem" }}>{report.summary}</p>
    </section>
  );
}
