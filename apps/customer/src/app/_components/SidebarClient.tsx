"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { ThemeToggle } from "@qt/ui/theme";

export default function SidebarClient() {
  const pathname = usePathname();
  return (
    <Sidebar
      className="h-screen w-full border-r"
      iconItem={
        <HStack className="w-full items-center justify-between gap-1">
          <Image src={"/qt-logo.png"} height={40} width={40} alt="QT Logo" />
          <Text styles={"p_ui_medium"}>Quick Transitt</Text>
          <ThemeToggle />
        </HStack>
      }
    >
      <SidebarBody>
        <Link href={"/"} className="w-full">
          <SidebarItem isActive={pathname === "/"}>
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
        <Button asChild>
          <Link href={"/new"}>
            <PackagePlusIcon /> New Request
          </Link>
        </Button>
        <HStack className="items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <VStack className="w-full gap-0 overflow-hidden">
            <Text styles={"p_ui_medium"}>IG Institution</Text>
            <Text styles={"body"} className="w-full text-muted-foreground">
              iginstitutescontantme@gmail.com
            </Text>
          </VStack>
        </HStack>
      </SidebarBottomContent>
    </Sidebar>
  );
}
