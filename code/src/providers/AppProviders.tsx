"use client";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { ThemeProvider } from "next-themes";
import { ServicesProvider } from "./ServicesProvider";
export default function AppProviders({ session, children }: { session: Session | null; children: React.ReactNode }) {
  return <SessionProvider session={session} refetchOnWindowFocus={false}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ServicesProvider>{children}</ServicesProvider>
    </ThemeProvider>
  </SessionProvider>;
}
