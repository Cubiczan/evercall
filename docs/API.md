# 🔌 API Contract

> REST routes live under `src/app/api`. The realtime loop is WS-based (AssemblyAI ⇄ orchestrator, not exposed to the browser directly in demo mode).

## Conventions

- Base URL: `/api`
- All bodies JSON, `Content-Type: application/json`
- Errors: `{ "error": { "code": string, "message": string } }`

| Code | Meaning |
|---|---|
| `INVALID_REQUEST` | Validation failed — see message |
| `CALL_NOT_FOUND` | Unknown `callId` |
| `ANALYSIS_PENDING` | Report not ready yet (poll ≤ 15 s after hangup) |
| `UPSTREAM_ERROR` | AssemblyAI call failed after retries |

---

## `POST /api/call` — trigger a call

```jsonc
// Request (all optional — defaults to demo mode, "Ruth")
{
  "mode": "demo" | "pstn",       // default "demo"
  "recipient": "ruth",           // profile key
  "note": "Ask about the recital"
}

// 202 Accepted
{
  "callId": "call_01J8...",
  "status": "in_progress",
  "scheduledAt": "2026-09-10T10:00:00Z",
  "mode": "demo"
}
```

## `GET /api/calls/:id` — call status & transcript

```jsonc
// 200
{
  "callId": "call_01J8...",
  "status": "completed",          // scheduled | in_progress | completed | missed
  "durationSec": 287,
  "transcript": [
    { "speaker": "agent",  "text": "Good morning Ruth! How did the recital go?", "t": 1.8 },
    { "speaker": "ruth",   "text": "Oh it was lovely, the neighbour came too…",  "t": 6.2 }
  ],
  "report": { "$ref": "WellbeingReport" }   // null until analysis done
}
```

## `GET /api/analysis?callId=…` — the Radar report

```jsonc
// 200
{
  "callId": "call_01J8...",
  "mood": { "label": "positive", "score": 0.82 },
  "medsTaken": true,
  "medsMentions": ["morning pills taken with tea"],
  "memorySlips": 1,
  "memorySlipDetail": "Asked about the neighbour 3× (~t42, t88, t151)",
  "caregiverJoined": true,
  "highlights": ["Granddaughter's recital on Friday", "New tea from Maria"],
  "severity": "info",
  "summary": "Cheerful, meds on schedule, Maria stayed for lunch."
}
```

## `GET /api/alerts` — family alert feed

```jsonc
// 200
{
  "alerts": [
    {
      "id": "alr_01J8...",
      "callId": "call_01J7...",
      "severity": "warning",
      "title": "Meds not mentioned today",
      "detail": "Ruth did not reference her morning pills in a 6-min call. Worth a check-in.",
      "createdAt": "2026-09-11T10:08:12Z",
      "read": false
    }
  ]
}
```

`severity` ladder: `info` → daily digest only · `warning` → in-app + webhook · `urgent` → immediate webhook, no batching.

## `WS /api/realtime?callId=…` — demo-mode live view

Server pushes `{ type: "partial" | "final" | "agent_reply" | "report", payload }` frames so the dashboard can show the live transcript during the demo. (Internally this mirrors the orchestrator's AssemblyAI WS.)

---

## LeMUR Prompts (source of truth)

**System (analysis):**

```
You are a careful care-monitor. You receive a diarized transcript of a daily
check-in call between a voice agent ("agent") and an elderly person ("ruth").
Extract signals WITHOUT diagnosing. Return ONLY JSON matching the
WellbeingReport schema. Severity rubric:
- info: normal warm call, meds resolved, no concern
- warning: meds ambiguous/missing, mood dipped vs. baseline, repeated confusion
- urgent: falls, chest pain, breathlessness, "can't get up", fear of harm,
  or any emergency-intent language
```

**User template:**

```
MED_LIST: {{meds}}
BASELINE_MOOD: {{baseline}}
TRANSCRIPT:
{{transcript}}
Respond with JSON only.
```

## Testing the Contract

Golden scripts (see `VOICE_LOOP.md`) map to expected fixture responses in `src/lib/mock.ts` — the API routes serve these so the dashboard and demo video work before Week 3 integration lands.
