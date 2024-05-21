"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BoxesIcon, HomeIcon } from "lucide-react";

import { cn } from "@qt/ui";
import { Button } from "@qt/ui/button";
import { HStack } from "@qt/ui/stack";

export default function Subheader() {
  const pathname = usePathname();
  return (
    <HStack className="gap-6 px-44">
      <Button
        asChild
        size={"lg"}
        variant={"ghost"}
        className={cn(
          "justify-start rounded-none py-6 font-normal  hover:bg-transparent",
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
          "justify-start rounded-none py-6 font-normal  hover:bg-transparent",
          pathname === "/packages" &&
            "border-b-2 border-primary text-primary hover:text-primary",
        )}
      >
        <Link href={"/packages"}>
          <BoxesIcon className="h-5 w-5" />
          Packages
        </Link>
      </Button>
    </HStack>
  );
}
