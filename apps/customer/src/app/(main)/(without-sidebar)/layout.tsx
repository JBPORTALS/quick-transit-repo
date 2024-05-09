import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BellIcon } from "lucide-react";

import { Button } from "@qt/ui/button";
import { Header, HeaderRight, HeaderTitle } from "@qt/ui/header";
import { HStack, VStack } from "@qt/ui/stack";

export default function PackageDetailsLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Header className="sticky top-0">
        <HeaderTitle>
          <HStack className="items-center">
            <Link href={"/"}>
              <Image
                src={"/qt-logo.png"}
                height={40}
                width={40}
                alt="QT Logo"
              />
            </Link>
            {title}
          </HStack>
        </HeaderTitle>
        <HeaderRight>
          <Button size={"icon"} variant={"ghost"}>
            <BellIcon className="h-5 w-5" />
          </Button>
        </HeaderRight>
      </Header>
      <VStack className="h-full max-h-fit w-full p-5">{children}</VStack>
    </div>
  );
}
