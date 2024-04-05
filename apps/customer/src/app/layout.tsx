import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@qt/ui";
import { Header, HeaderRight, HeaderTitle } from "@qt/ui/header";
import { ThemeProvider, ThemeToggle } from "@qt/ui/theme";
import { Toaster } from "@qt/ui/toast";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { LayoutGrid, Package2Icon, PackagePlusIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Button } from "@qt/ui/button";
import Sidebar, {
  SidebarBody,
  SidebarBottomContent,
  SidebarItem,
  SidebarLabel,
} from "@qt/ui/sidebar";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

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
          "h-screen min-h-screen bg-secondary font-sans text-foreground antialiased dark:bg-background",
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
                      <SidebarBody>
                        <SidebarItem isActive>
                          <LayoutGrid /> Dashboard
                        </SidebarItem>
                        <SidebarItem>
                          <Package2Icon /> Packages
                        </SidebarItem>
                      </SidebarBody>
                      <SidebarBottomContent>
                        <Button>
                          <PackagePlusIcon /> New Request
                        </Button>
                        <HStack className="items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <VStack className="gap-1">
                            <Text styles={"p_ui_medium"}>IG Institution</Text>
                            <Text styles={"body"}>ig@gmail.com</Text>
                          </VStack>
                        </HStack>
                      </SidebarBottomContent>
                    </Sidebar>
                  </div>
                </div>
                <div className="w-full ">
                  <Header>
                    <HeaderTitle>Dashboard</HeaderTitle>
                  </Header>
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
