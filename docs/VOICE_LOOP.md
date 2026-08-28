# 🎙️ The Voice Loop — Deep Dive

> This is the heart of EverCall: how a 300 ms conversation turn feels natural to a 78-year-old.

## The Loop in One Breath

```
mic audio (PCM 16kHz) ──► AssemblyAI Universal-3.5 Pro Realtime (WS)
                              │ partial transcripts (ignore for turns)
                              │ final transcripts (drive the turn)
                              ▼
                    Conversation LLM (persona)
                              │ reply text
                              ▼
                       TTS ──► speaker
```

One turn should complete in **≤ 1.5 s** from grandma's last word to the agent's first word. Our latency budget:

| Stage | Budget | Notes |
|---|---|---|
| Endpointing (silence detection) | ~700 ms | **Tuned up from default** — elderly speech pauses longer |
| Final transcript delivery | ~150 ms | Universal-3.5 Pro Realtime is built for exactly this |
| LLM first token | ~300 ms | Short persona-context prompt, cached system message |
| TTS first byte | ~250 ms | Stream sentence 1 while sentence 2 generates |
| **Total** | **~1.4 s** | Feels like a human "thinking pause", not a robot |

## Persona: "Ellie"

The agent plays a warm, slightly chatty companion — *not* a nurse, *not* a robot:

- **Warmth first, data second.** Meds come up inside conversation ("Did the morning pills happen before your tea?"), never as an interrogation checklist.
- **Slow pacing, short sentences.** TTS rate reduced ~10%, we ask one question at a time.
- **Memory with grace.** If Ruth repeats herself, Ellie responds naturally and logs a memory slip — she never says "you already told me that."
- **Honest about being AI** if asked directly. Never pretends to be a human family member.
- **Escalation rule:** any mention of chest pain, falling, or "can't get up" → Ellie responds with care ("Let me ring your daughter right away") and the call is flagged `urgent` immediately.

## Turn-Taking Rules

1. **Only `final` utterances advance the turn.** Partials are displayed in the demo UI but never trigger a reply — partials would make the agent interrupt mid-thought.
2. **Endpointing configured for elderly speech**: ~700–900 ms silence threshold (AssemblyAI `end_utterance_silence_threshold`), instead of the aggressive ~300 ms chatbot default.
3. **Barge-in (grandma interrupts Ellie):** supported — while TTS plays, if a *final* grandma utterance arrives, TTS playback stops and the LLM re-plans with the interruption in context.
4. **8-min hard cap** + natural closings ("I'll let you get back to your show — talk tomorrow!").

## Demo Mode vs. Real Calls

| | 🖥️ Demo mode (MVP, judges) | ☎️ Real call (stretch goal) |
|---|---|---|
| Grandma's audio | Pre-recorded voice actor clips played into the loop | Twilio Media Streams (PSTN → WS, μ-law → PCM) |
| Ellie's audio | Browser `AudioContext` | Same stream, back over Twilio |
| Setup needed | None | Twilio account + number |
| Why | Full loop demoable by anyone in 30 s | The actual product |

The orchestrator abstracts this behind a `CallTransport` interface — the analysis, dashboard, and alert code don't know or care which mode ran.

## Cost Guardrails

- 5-min average call ≈ 5 min realtime STT + ~2k LLM tokens + TTS — pennies per day per family.
- Hard caps: 1 scheduled call/day + 3 manual calls/day; 8-min max duration; dev-mode cost counter printed per call.

## Testing the Loop

- **Goldens:** 5 scripted recorded conversations (normal, missed meds, memory slip, caregiver visit, distress) replayed through the full loop to validate the Radar end-to-end.
- **Chaos:** drop WS mid-call, 30 s silence, overlapping speech — assert fallbacks from `ARCHITECTURE.md`.
- **Ear test:** every squad member calls their own demo line before submission. If it doesn't feel warm, it doesn't ship.
