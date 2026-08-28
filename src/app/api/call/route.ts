import { NextResponse } from "next/server";
import { MOCK_NEXT_CALL } from "@/lib/mock";

/**
 * POST /api/call — trigger a call (demo mode default).
 * Stub: echoes a scheduled call. W2 note: hand off to the orchestrator, which
 * opens the AssemblyAI Realtime WS (see src/lib/assemblyai.ts).
 */
export async function POST(request: Request) {
  let body: { mode?: string; recipient?: string; note?: string } = {};
  try {
    body = await request.json();
  } catch {
    // empty body is fine — defaults apply
  }

  const mode = body.mode === "pstn" ? "pstn" : "demo";
  if (mode === "pstn") {
    return NextResponse.json(
      {
        error: {
          code: "INVALID_REQUEST",
          message: "PSTN mode lands in Week 4 stretch — use mode:'demo' for now.",
        },
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      callId: MOCK_NEXT_CALL.id,
      status: "in_progress",
      scheduledAt: new Date().toISOString(),
      mode,
    },
    { status: 202 }
  );
}
