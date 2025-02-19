"use client";

import { Acme } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellIcon, PackagePlus } from "lucide-react";

import { Button } from "@qt/ui/button";
import { Header, HeaderRight, HeaderTitle } from "@qt/ui/header";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import AvatarButton from "./AvatarButton";
import NotificationsPopover from "./notifications-popover";
import Subheader from "./subheader";

const AcmeFont = Acme({
  variable: "--acme-font",
  subsets: ["latin"],
  weight: ["400"],
});

export default function HeaderClient() {
  const pathname = usePathname();
  return (
    <VStack className="sticky inset-0 top-0 z-50 w-full gap-0 border-b bg-background/80 backdrop-blur-sm">
      <Header className=" bg-transparent px-44">
        <Link href={"/dashboard"}>
          <HeaderTitle>
            <HStack className="w-full items-center justify-center gap-0">
              <Image
                src={"/qt-logo.png"}
                height={40}
                width={40}
                alt="QT Logo"
              />
              <Text
                styles={"h3"}
                className={`font-sans font-extrabold text-gray-700 dark:text-gray-300 ${AcmeFont.className}`}
              >
                Quick Transitt
              </Text>
            </HStack>
          </HeaderTitle>
        </Link>
        <HeaderRight>
          <HStack>
            <Link target="_blank" href={"https://wa.me/message/NRTADMKQMKXOO1"}>
              <Button
                size={"lg"}
                variant={"outline"}
                className="rounded-full border-[#28C669] bg-[#28C669]/30 hover:bg-[#28C669]/15"
              >
                <Image
                  src={"/whatsapp.gif"}
                  height={32}
                  width={32}
                  alt="whatsapp logo"
                  className="animate-in"
                />
                Contact Us
              </Button>
            </Link>
            <AvatarButton />
          </HStack>
        </HeaderRight>
      </Header>
      {["/dashboard", "/packages"].includes(pathname) && <Subheader />}
    </VStack>
  );
}
