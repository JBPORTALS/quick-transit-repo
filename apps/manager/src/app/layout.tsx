import type { Metadata, Viewport } from "next";
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
      ? `${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT}`,
  ),
  title: "Quick Transitt | Manager",
  description:
    "Efficiently Manage and Streamline Your Package Transportation Requests and Delivery Processes with Ease",
  openGraph: {
    title: "Quick Transitt | Manager",
    description:
      "Efficiently Manage and Streamline Your Package Transportation Requests and Delivery Processes with Ease",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Quick Transitt | Manager",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "h-screen min-h-screen bg-secondary font-sans text-foreground antialiased dark:bg-background",
          GeistSans.variable,
          GeistMono.variable,
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
