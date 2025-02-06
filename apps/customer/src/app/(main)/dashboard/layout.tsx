import React from "react";
import Link from "next/link";
import { PackagePlusIcon } from "lucide-react";

import { Button } from "@qt/ui/button";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export default function layout({
  children,
  trackbar,
}: {
  children: React.ReactNode;
  trackbar: React.ReactNode;
}) {
  return (
    <VStack className="h-full w-full gap-5">
      <HStack className="w-full items-center justify-between">
        <Text styles={"lead"} className="font-medium">
          Your Recent Requests
        </Text>
        <Link href={"/new"}>
          <Button variant={"outline"}>
            <PackagePlusIcon className="size-5" /> Add Package
          </Button>
        </Link>
      </HStack>
      <HStack className="relative grid w-full grid-cols-6 gap-6">
        {children}
        {trackbar}
      </HStack>
    </VStack>
  );
}
