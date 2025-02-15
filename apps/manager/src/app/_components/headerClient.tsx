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
        <HeaderTitle>
          <HStack className="w-full items-center justify-center gap-0">
            <Image src={"/qt-logo.png"} height={40} width={40} alt="QT Logo" />
            <Text
              styles={"h3"}
              className={`align-middle font-sans font-extrabold text-gray-700 dark:text-gray-300 ${AcmeFont.className}`}
            >
              QT <span className="text-base text-primary">●</span> Console
            </Text>
          </HStack>
        </HeaderTitle>
        <HeaderRight>
          <HStack>
            {/* <NotificationsPopover>
              <Button
                size={"icon"}
                variant={"outline"}
                className="rounded-full"
              >
                <BellIcon className="h-5 w-5" />
              </Button>
            </NotificationsPopover> */}
            <AvatarButton />
          </HStack>
        </HeaderRight>
      </Header>
      {/* if these paths are isn't include in the pathname, then show the sub header. */}
      {!["/package-details", "/partners/v"]
        .map((value) => pathname.startsWith(value))
        .includes(true) && <Subheader />}
    </VStack>
  );
}
