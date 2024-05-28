import type { Metadata, Viewport } from "next";
import { Acme } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@qt/ui";
import { ThemeProvider } from "@qt/ui/theme";
import { Toaster } from "@qt/ui/toast";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "Quick Transitt",
  description: "Your Fast and Reliable Package Transfer Solution",
  openGraph: {
    title: "Quick Transitt",
    description: "Your Fast and Reliable Package Transfer Solution",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Quick Transitt",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const AcmeFont = Acme({
  variable: "--font-acme",
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "h-screen min-h-screen gap-0 bg-background font-sans text-foreground",
          GeistSans.variable,
          GeistMono.variable,
          AcmeFont.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
