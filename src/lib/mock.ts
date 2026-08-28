import type { Alert, CallRecord, WellbeingReport } from "./types";

/**
 * Realistic demo fixtures — served by the API stubs so the dashboard and the
 * demo video work BEFORE Week 3 integration lands. Replace with DB reads when
 * the intelligence plane is wired (docs/BUILD_PLAN.md).
 */

export const MOCK_NEXT_CALL: CallRecord = {
  id: "call_01J8DEMO",
  recipient: "Ruth",
  mode: "demo",
  status: "in_progress",
  scheduledAt: "2026-09-10T10:00:00Z",
  durationSec: 287,
};

export const MOCK_ANALYSIS: WellbeingReport = {
  callId: "call_01J8DEMO",
  mood: { label: "positive", score: 0.82 },
  medsTaken: true,
  medsMentions: ["morning pills taken with tea"],
  memorySlips: 1,
  memorySlipDetail: "Asked about the neighbour 3× (~t42, t88, t151)",
  caregiverJoined: true,
  highlights: ["Granddaughter's recital on Friday", "New tea from Maria"],
  severity: "info",
  summary: "Cheerful call, meds on schedule, Maria (caregiver) stayed for lunch.",
};

export const MOCK_ALERTS: Alert[] = [
  {
    id: "alr_01J8A",
    callId: "call_01J7XYZ",
    severity: "warning",
    title: "Meds not mentioned today",
    detail:
      "Ruth did not reference her morning pills in a 6-min call. Worth a check-in.",
    createdAt: "2026-09-11T10:08:12Z",
    read: false,
  },
  {
    id: "alr_01J8B",
    callId: "call_01J8DEMO",
    severity: "info",
    title: "Daily digest",
    detail:
      "Cheerful call. Pills taken with tea. Maria stayed for lunch — recital talk ×2 🎹",
    createdAt: "2026-09-10T18:00:00Z",
    read: false,
  },
];

/** 14-day mood trend for the sparkline (0..1). */
export const MOCK_MOOD_TREND: number[] = [
  0.71, 0.74, 0.69, 0.78, 0.8, 0.62, 0.66, 0.71, 0.75, 0.8, 0.84, 0.79, 0.81, 0.82,
];
