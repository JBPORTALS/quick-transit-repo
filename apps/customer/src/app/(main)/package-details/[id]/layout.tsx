import React from "react";

import { HStack, VStack } from "@qt/ui/stack";

export default function layout({
  children,
  trackbar,
}: {
  children: React.ReactNode;
  trackbar: React.ReactNode;
}) {
  return (
    <VStack className="h-full max-h-fit w-full gap-5">
      <HStack className="relative grid h-full max-h-fit w-full grid-cols-10 gap-10">
        {children}
        {trackbar}
      </HStack>
    </VStack>
  );
}
