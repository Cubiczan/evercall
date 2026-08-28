import { NextResponse } from "next/server";
import { MOCK_ALERTS } from "@/lib/mock";

/**
 * GET /api/alerts — family alert feed, newest first.
 * Stub: golden fixtures. W3 note: read from DB; severity >= warning also
 * fans out to FAMILY_ALERT_WEBHOOK_URL at write time (docs/ARCHITECTURE.md).
 */
export async function GET() {
  const ordered = [...MOCK_ALERTS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json({ alerts: ordered });
}
