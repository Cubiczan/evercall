/** Core domain types — keep in sync with docs/API.md (change both in the same PR). */

export type CallStatus = "scheduled" | "in_progress" | "completed" | "missed";

export interface CallRecord {
  id: string;
  recipient: string;
  mode: "demo" | "pstn";
  status: CallStatus;
  scheduledAt: string; // ISO
  durationSec?: number;
}

export type Severity = "info" | "warning" | "urgent";
export type MoodLabel = "positive" | "neutral" | "concerning";

/** Output of the AssemblyAI LeMUR post-call analysis (the "Wellbeing Radar"). */
export interface WellbeingReport {
  callId: string;
  mood: { label: MoodLabel; score: number }; // score: 0..1
  medsTaken: boolean;
  medsMentions: string[];
  memorySlips: number;
  memorySlipDetail?: string;
  caregiverJoined: boolean; // via AssemblyAI Speaker Diarization
  highlights: string[];
  severity: Severity;
  summary: string;
}

export interface Alert {
  id: string;
  callId: string;
  severity: Severity;
  title: string;
  detail: string;
  createdAt: string; // ISO
  read: boolean;
}

/** One spoken utterance in the live transcript view. */
export interface TranscriptLine {
  speaker: "agent" | "caller" | "caregiver";
  text: string;
  t: number; // seconds from call start
}
