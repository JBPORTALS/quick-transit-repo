"use client";

import { usePathname } from "next/navigation";
import { BellIcon } from "lucide-react";

import { Button } from "@qt/ui/button";
import { Header, HeaderRight, HeaderTitle } from "@qt/ui/header";
import { HStack } from "@qt/ui/stack";

import AvatarButton from "./AvatarButton";

const headerPathMap = [
  { name: "Dashboard", path: "/", abosolute: true },
  { name: "Packages", path: "/packages" },
];
export default function HeaderClient() {
  const pathname = usePathname();
  return (
    <Header className="sticky top-0">
      <HeaderTitle>
        {headerPathMap.map(({ name, path }) => {
          if (pathname === path) return name;
          else return null;
        })}
      </HeaderTitle>
      <HeaderRight>
        <HStack>
          <AvatarButton />
          <Button size={"icon"} variant={"outline"} className="rounded-full">
            <BellIcon className="h-5 w-5" />
          </Button>
        </HStack>
      </HeaderRight>
    </Header>
  );
}
