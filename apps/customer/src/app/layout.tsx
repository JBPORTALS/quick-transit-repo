import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@qt/ui";
import { Header, HeaderRight, HeaderTitle } from "@qt/ui/header";
import { ThemeProvider, ThemeToggle } from "@qt/ui/theme";
import { Toaster } from "@qt/ui/toast";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import SidebarClient from "./_components/SidebarClient";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const PoppinsFont = Poppins({
  weight: ["100", "200", "300", "400"],
  variable: "--font-poppins",
  subsets: ["devanagari"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "h-screen min-h-screen gap-0 overflow-hidden bg-secondary font-sans text-foreground dark:bg-background",
          PoppinsFont.variable,
          PoppinsFont.variable,
        )}
      >
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TRPCReactProvider>
              <div className="relative grid h-full w-full grid-cols-6 gap-0">
                <SidebarClient />
                <div className="col-span-5 overflow-y-scroll">
                  <Header className="sticky top-0">
                    <HeaderTitle>Dashboard</HeaderTitle>
                  </Header>
                  <div className="flex flex-col p-5">{props.children}</div>
                </div>
              </div>
            </TRPCReactProvider>
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
