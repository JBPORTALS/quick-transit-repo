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

import Image from "next/image";
import { LayoutGrid, Package2Icon, PackagePlusIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Button } from "@qt/ui/button";
import Sidebar, {
  SidebarBody,
  SidebarBottomContent,
  SidebarItem,
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
          "h-screen min-h-screen gap-0 bg-secondary font-sans text-foreground dark:bg-background",
          PoppinsFont.variable,
          PoppinsFont.variable,
        )}
      >
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TRPCReactProvider>
              <div className="grid h-full w-full grid-cols-6 gap-0">
                <Sidebar
                  className="w-full border-r"
                  iconItem={
                    <HStack className="w-full items-center justify-between gap-1">
                      <Image
                        src={"/qt-logo.png"}
                        height={40}
                        width={40}
                        alt="QT Logo"
                      />
                      <Text styles={"p_ui_medium"}>Quick Transitt</Text>
                      <ThemeToggle />
                    </HStack>
                  }
                >
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
                      <VStack className="w-full gap-0 overflow-hidden">
                        <Text styles={"p_ui_medium"}>IG Institution</Text>
                        <Text
                          styles={"body"}
                          className="w-full text-muted-foreground"
                        >
                          iginstitutescontantme@gmail.com
                        </Text>
                      </VStack>
                    </HStack>
                  </SidebarBottomContent>
                </Sidebar>
                <div className="col-span-5">
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
