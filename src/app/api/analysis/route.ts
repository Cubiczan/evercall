import { NextResponse } from "next/server";
import { MOCK_ANALYSIS } from "@/lib/mock";

/**
 * GET /api/analysis?callId=… — the Wellbeing Radar report.
 * Stub: returns the golden fixture. W3 note: read the LeMUR-produced
 * WellbeingReport from the DB (see docs/API.md for the contract).
 */
export async function GET(request: Request) {
  const callId = new URL(request.url).searchParams.get("callId");
  if (callId && callId !== MOCK_ANALYSIS.callId) {
    // Stubs only know the demo call — pretend the report is still cooking.
    return NextResponse.json(
      { error: { code: "ANALYSIS_PENDING", message: "Report not ready yet (≤15s after hangup)." } },
      { status: 409 }
    );
  }
  return NextResponse.json(MOCK_ANALYSIS);
}
