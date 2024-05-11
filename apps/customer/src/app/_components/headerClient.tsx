"use client";

import { Acme } from "next/font/google";
import Image from "next/image";
import { BellIcon } from "lucide-react";

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
    <Header className="px-40">
      <HeaderTitle>
        <HStack className="w-full items-center justify-center gap-0">
          <Image src={"/qt-logo.png"} height={40} width={40} alt="QT Logo" />
          <Text
            styles={"h3"}
            className={`font-sans font-extrabold ${AcmeFont.className}`}
          >
            Quick Transitt
          </Text>
        </HStack>
      </HeaderTitle>
      <HeaderRight>
        <HStack>
          <Button size={"icon"} variant={"outline"} className="rounded-full">
            <BellIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <AvatarButton />
        </HStack>
      </HeaderRight>
    </Header>
  );
}
