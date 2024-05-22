"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  LogOutIcon,
  Package2Icon,
  PackagePlusIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Button } from "@qt/ui/button";
import Sidebar, {
  SidebarBody,
  SidebarBottomContent,
  SidebarItem,
} from "@qt/ui/sidebar";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";
import { ThemeToggle } from "@qt/ui/theme";

import { createClient } from "~/utils/client";

export default function SidebarClient() {
  const pathname = usePathname();
  const supabase = createClient();
  const router = useRouter();
  return (
    <Sidebar
      className="h-screen w-full"
      iconItem={
        <HStack className="w-full items-center justify-center gap-0">
          <Image src={"/qt-logo.png"} height={40} width={40} alt="QT Logo" />
          <Text styles={"h3"} className="font-serif">
            Quick Transitt
          </Text>
        </HStack>
      }
    >
      <SidebarBody>
        <Link href={"/dashboard"} className="w-full">
          <SidebarItem isActive={pathname === "/dashboard"}>
            <LayoutGrid /> Dashboard
          </SidebarItem>
        </Link>
        <Link href={"/packages"} className="w-full">
          <SidebarItem isActive={pathname.startsWith("/packages")}>
            <Package2Icon /> Packages
          </SidebarItem>
        </Link>
      </SidebarBody>
      <SidebarBottomContent>
        <SidebarItem
          onClick={() => {
            supabase.auth.signOut().then(() => router.refresh());
          }}
        >
          <LogOutIcon /> Logout
        </SidebarItem>
      </SidebarBottomContent>
      <ThemeToggle />
    </Sidebar>
  );
}
