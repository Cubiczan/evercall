# 🗓️ Build Plan — Sep 1–30, 2026

> Squad of 4 · demo-first · submitted ≥48h before the deadline. If a week's milestone slips, we cut scope from the *bottom* of the feature list, never from the demo.

## Tracks (who owns what)

| Person | Track | Weekly rhythm |
|---|---|---|
| **A — Voice lead** | Conversation plane: realtime STT ⇄ LLM ⇄ TTS loop | Lives in `src/lib/assemblyai.ts` + orchestrator |
| **B — Dashboard lead** | Presentation plane: dashboard, radar UI, trends, demo flow | Lives in `src/components` + `page.tsx` |
| **C — Intelligence lead** | LeMUR reports, alert engine, API routes, DB | Lives in `src/app/api` + schema |
| **D — Founder/PM** | Product decisions, demo script, video, lablab page, unblocking | Reviews everything, builds nothing, ships the story |

Standup: 15 min daily (Discord). Demo: Friday — *working software only, slides forbidden*.

## Week 1 (Sep 1–7) — 🎤 "Hello Voice"

**Goal: browser mic → live transcript on screen.**

- [ ] Repo + scaffold merged (this skeleton), env loading, CI-less but `npm run build` green
- [ ] AssemblyAI key provisioned; hello-world WebSocket to Universal-3.5 Pro Realtime (A)
- [ ] Mic capture → PCM 16k chunking → WS (A)
- [ ] Transcript rendered live in a dev-only `/dev/voice` page (B)
- [ ] `WellbeingReport` JSON schema drafted + reviewed by all (C)
- [ ] Record 5 "grandma golden" scripts; recruit voice actor (any squad's relative/friend) (D)

**Exit criteria:** talk to the browser, see clean finals stream in. Schema signed off.

## Week 2 (Sep 8–14) — 💬 "The Conversation"

**Goal: a 2-minute natural two-way call in demo mode.**

- [ ] Turn-taking engine: finals only, elderly-tuned endpointing (~700–900 ms), barge-in (A)
- [ ] Persona "Ellie" v1: system prompt, slow TTS pacing, med-nudge scripts (A + D review)
- [ ] TTS wired, latency budget instrumented (log per-stage ms) (A)
- [ ] Demo mode `CallTransport`: replay golden clips through the loop (C)
- [ ] Dashboard: `CallCard` + live transcript pane with real data (B)

**Exit criteria:** Friday demo = squad member has a 2-min chat with Ellie; zero awkward overlaps in the final 30 s.

## Week 3 (Sep 15–21) — 🧠 "The Radar"

**Goal: hang up → insight → alert, fully automatic.**

- [ ] LeMUR analysis prompt → strict JSON `WellbeingReport`; validation + 1-retry (C)
- [ ] Sentiment + diarization fields filled (`caregiverJoined`) (C)
- [ ] Postgres (or SQLite-for-now) schema: calls, transcripts, reports, alerts (C)
- [ ] Dashboard: `WellbeingRadar`, `MoodTrend` (14-day sparkline), `AlertFeed` on real data (B)
- [ ] Alert engine: severity rubric → webhook + in-app; "urgent" path tested (C)
- [ ] End-to-end run on all 5 goldens: correct mood/meds/slips on each (all)

**Exit criteria:** golden #5 (distress script) fires an urgent alert within 10 s of hangup.

## Week 4 (Sep 22–30) — 🏆 "Ship It"

**Goal: submitted, with buffer.**

- [ ] **Sep 22–24:** record 3-min demo video (script: `evercall-pitch/demo/DEMO_SCRIPT.md`), 2 takes max, captions on
- [ ] **Sep 24–26:** README final pass, thumbnails in, lablab project page + team page, `CONTRIBUTING`/LICENSE polish
- [ ] **Sep 26–28:** bug bash on the demo path only; cost guardrails verified; fresh-clone test (`npm install && npm run dev` on a clean machine)
- [ ] **Sep 28 (target): SUBMIT.** 48h buffer for the classic "it worked yesterday" 
- [ ] Sep 29–30: sleep, brag on LinkedIn

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Realtime latency feels robotic | Med | Demo-killing | Elderly-tuned endpointing + finals-only turns; ear test weekly |
| Telephony (Twilio) rabbit hole | High | Week sink | Demo mode is the MVP; PSTN only if W2 lands early |
| LeMUR JSON drift | Med | Radar breaks | Strict schema validation + retry; store raw as fallback |
| Voice actor flaky | Med | Demo falls flat | Record all goldens in W1; synthetic TTS grandma is plan C |
| Squad of 4 → someone vanishes | Low–Med | Track stalls | Tracks paired in review; D reassigns within 24h |

## Scope Ladder (cut bottom-up when behind)

1. ✅ Core: demo-mode call → transcript → LeMUR report → dashboard
2. ✅ Alerts (warning + urgent paths)
3. 🎯 Mood trend across goldens (multi-day view)
4. 🎯 Twilio real PSTN call
5. 🎯 Multi-user auth / multi-family
6. 🎯 Multi-language personas

*If we ship 1–3 we have a winning demo. 4–6 are stretch.*
