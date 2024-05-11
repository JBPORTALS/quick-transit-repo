"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, Package } from "lucide-react";

import { cn } from "@qt/ui";
import { Button } from "@qt/ui/button";
import { HStack, VStack } from "@qt/ui/stack";

import HeaderClient from "../../_components/headerClient";

export default function RootLayout(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="relative h-full w-full gap-0">
      {/* <SidebarClient /> */}
      <div className="col-span-5">
        <VStack className="relative border-b">
          <HeaderClient />
          <HStack className="gap-8 px-44">
            <Button
              asChild
              size={"lg"}
              variant={"ghost"}
              className={cn(
                "justify-start rounded-none px-0 py-6 pr-6 font-normal  hover:bg-transparent",
                pathname === "/dashboard" &&
                  "border-b-2 border-primary text-primary hover:text-primary",
              )}
            >
              <Link href={"/dashboard"}>
                <HomeIcon className="h-5 w-5" />
                Home
              </Link>
            </Button>
            <Button
              asChild
              size={"lg"}
              variant={"ghost"}
              className={cn(
                "rounded-none px-0 py-6 pr-6 font-normal  hover:bg-transparent",
                pathname === "/packages" &&
                  "border-b-2 border-primary text-primary hover:text-primary",
              )}
            >
              <Link href={"/packages"}>
                <Package className="h-5 w-5" />
                Packages
              </Link>
            </Button>
          </HStack>
        </VStack>
        <div className="flex flex-col px-44 py-5">{props.children}</div>
      </div>
    </div>
  );
}
