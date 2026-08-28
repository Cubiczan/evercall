/**
 * Every AssemblyAI touchpoint lives here — one file to wire, one file to swap
 * the stubs for the real thing. See docs/API.md (contract) and
 * docs/VOICE_LOOP.md (loop design) before implementing.
 *
 * Docs:
 *  - Realtime STT:  https://www.assemblyai.com/docs/speech-to-text/real-time-streaming-transcription
 *  - LeMUR:         https://www.assemblyai.com/docs/lemur
 *  - Diarization:   https://www.assemblyai.com/docs/speech-to-text/speaker-diarization
 */

export const ASSEMBLYAI_REALTIME_URL =
  "wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000";

/** Elderly speech needs a longer silence threshold than the chatty default. */
export const ELDERLY_ENDPOINTING_MS = 800;

/* ------------------------------------------------------------------ */
/* 1. Realtime loop (Week 1–2, owner: voice lead)                      */
/* ------------------------------------------------------------------ */

/** TODO(W1): open the Realtime WS with header { Authorization: key }, stream
 *  PCM 16k mono chunks, emit `final` utterances only (partials → UI toast).
 *  Configure end_utterance_silence_threshold = ELDERLY_ENDPOINTING_MS. */
export async function openRealtimeSession(_micStream: MediaStream): Promise<void> {
  throw new Error("Not implemented — W1 milestone 'Hello Voice' (docs/BUILD_PLAN.md)");
}

/* ------------------------------------------------------------------ */
/* 2. Post-call Radar (Week 3, owner: intelligence lead)               */
/* ------------------------------------------------------------------ */

/** TODO(W3): run the transcript through LeMUR (apply the prompts in
 *  docs/API.md § LeMUR Prompts), validate the JSON against WellbeingReport,
 *  retry once on schema miss. Sentiment + diarization fields come from the
 *  transcript record / Sentiment API. */
export async function analyzeTranscript(
  _transcriptId: string,
): Promise<never> {
  throw new Error("Not implemented — W3 milestone 'The Radar' (docs/BUILD_PLAN.md)");
}

/* ------------------------------------------------------------------ */
/* 3. Batch transcript of a recorded call (fallback path)              */
/* ------------------------------------------------------------------ */

/** TODO(W3): POST audio to /v2/transcript with speaker_labels=true, poll, then
 *  feed segments into analyzeTranscript. Used when a call drops mid-WS. */
export async function transcribeRecording(_audioUrl: string): Promise<never> {
  throw new Error("Not implemented — fallback path (docs/ARCHITECTURE.md)");
}
