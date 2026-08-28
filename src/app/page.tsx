import AlertFeed from "@/components/AlertFeed";
import CallCard from "@/components/CallCard";
import MoodTrend from "@/components/MoodTrend";
import WellbeingRadar from "@/components/WellbeingRadar";
import { MOCK_ALERTS, MOCK_ANALYSIS, MOCK_MOOD_TREND, MOCK_NEXT_CALL } from "@/lib/mock";

/**
 * The family dashboard — "the Radar".
 * W3 note: swap the MOCK_* imports for DB reads once the intelligence plane
 * is wired (docs/BUILD_PLAN.md). Layout is final — demo video shoots this view.
 */
export default function Dashboard() {
  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          Ever<span>Call</span> 📞
        </div>
        <div className="tagline">
          Ruth · daily check-in at 10:00 · demo mode — Jarvis for Grandma
        </div>
      </header>

      <div className="grid">
        <CallCard call={MOCK_NEXT_CALL} />
        <WellbeingRadar report={MOCK_ANALYSIS} />
        <MoodTrend values={MOCK_MOOD_TREND} />
        <AlertFeed alerts={MOCK_ALERTS} />
      </div>

      <p className="footnote">
        Built with AssemblyAI Universal-3.5 Pro Realtime · LeMUR · Diarization —
        AssemblyAI Voice Agent Hackathon 2026
      </p>
    </main>
  );
}
