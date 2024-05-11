"use client";

import { Acme } from "next/font/google";
import Image from "next/image";
import { BellIcon, PackagePlus } from "lucide-react";

import { Button } from "@qt/ui/button";
import { Header, HeaderRight, HeaderTitle } from "@qt/ui/header";
import { HStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import AvatarButton from "./AvatarButton";

const AcmeFont = Acme({
  variable: "--acme-font",
  subsets: ["latin"],
  weight: ["400"],
});

export default function HeaderClient() {
  return (
    <Header className="px-44">
      <HeaderTitle>
        <HStack className="w-full items-center justify-center gap-0">
          <Image src={"/qt-logo.png"} height={40} width={40} alt="QT Logo" />
          <Text
            styles={"h3"}
            className={`font-sans font-extrabold text-gray-700 dark:text-gray-300 ${AcmeFont.className}`}
          >
            Quick Transitt
          </Text>
        </HStack>
      </HeaderTitle>
      <HeaderRight>
        <HStack>
          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <PackagePlus className="h-5 w-5" />
          </Button>
          <Button size={"icon"} variant={"outline"} className="rounded-full">
            <BellIcon className="h-5 w-5" />
          </Button>
          <AvatarButton />
        </HStack>
      </HeaderRight>
    </Header>
  );
}
