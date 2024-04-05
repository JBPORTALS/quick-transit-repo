import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@qt/ui";
import Header from "@qt/ui/header";
import { ThemeProvider, ThemeToggle } from "@qt/ui/theme";
import { Toaster } from "@qt/ui/toast";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { LayoutGrid, Package2Icon } from "lucide-react";

import Sidebar, {
  SidebarBody,
  SidebarItem,
  SidebarLabel,
} from "@qt/ui/sidebar";

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

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "h-screen min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TRPCReactProvider>
              <div className="flex h-full w-full">
                <div className="h-full w-72">
                  <div className="fixed flex h-full border-r ">
                    <Sidebar>
                      <SidebarLabel>Manager</SidebarLabel>
                      <SidebarBody>
                        <SidebarItem isActive>
                          <LayoutGrid /> Dashboard
                        </SidebarItem>
                        <SidebarItem>
                          <Package2Icon /> Packages
                        </SidebarItem>
                      </SidebarBody>
                    </Sidebar>
                  </div>
                </div>
                <div className="w-full ">
                  <Header />
                  {props.children}
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
