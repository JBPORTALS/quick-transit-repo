"use client";

import { usePathname } from "next/navigation";
import { BellIcon } from "lucide-react";

import { Button } from "@qt/ui/button";
import { Header, HeaderRight, HeaderTitle } from "@qt/ui/header";

const headerPathMap = [
  { name: "Dashboard", path: "/", abosolute: true },
  { name: "Packages", path: "/packages" },
];
export default function HeaderClient() {
  const pathname = usePathname();
  return (
    <Header className="sticky top-0">
      <HeaderTitle>
        {headerPathMap.map(({ name, path, abosolute }) => {
          if (pathname === path) return name;
          else return null;
        })}
      </HeaderTitle>
      <HeaderRight>
        <Button size={"icon"} variant={"ghost"}>
          <BellIcon className="h-5 w-5" />
        </Button>
      </HeaderRight>
    </Header>
  );
}
