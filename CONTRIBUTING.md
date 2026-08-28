# 🤝 Contributing — EverCall

Hackathon rules of the road. Short, strict, kind.

## Setup (5 min)

```bash
npm install
cp .env.example .env.local    # ask D for the shared AssemblyAI key
npm run dev                   # http://localhost:3000 — mock data out of the box
```

## Branching

- `main` — always demoable. Protected: PRs only, 1 approval.
- Branch names: `feat/<scope>-<thing>`, `fix/<thing>`, `docs/<thing>`
  - e.g. `feat/voice-turn-taking`, `fix/radar-empty-state`

## Commits

Conventional, present tense: `feat(voice): tune endpointing to 800ms for elderly pauses`.
No `update`, no `stuff`, no `final_final_v2`.

## PRs

- Small (≤ ~400 lines) and single-purpose
- Description: **what**, **why**, **how to test**
- Screenshots/GIFs for UI changes — non-negotiable
- CI-less during the hackathon: reviewer MUST run `npm run build` before approving

## Working Agreements

1. **Demo Friday is sacred.** Working software only. Slides count as a miss.
2. **Ask in Discord, decide in call.** Long threads become decisions nobody remembers.
3. **The demo path is holy.** If your refactor touches the demo flow, ping D *before* merging in W4.
4. **No secrets in git, ever.** Keys live in `.env.local` (ignored). If a key leaks, rotate immediately and tell D.
5. **Cut scope bottom-up** per the ladder in `docs/BUILD_PLAN.md` — never cut demo polish.

## Code Style

- TypeScript strict, no `any` without a comment justifying it
- Components: function components + typed props, colocated CSS classes in `globals.css` (design tokens first)
- API routes return the shapes in `docs/API.md` — if the contract changes, change the doc in the same PR
