import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EverCall — Jarvis for Grandma",
  description:
    "Daily AI voice calls for elderly parents, with a wellbeing radar for families. Built for the AssemblyAI Voice Agent Hackathon.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
