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
      <HStack className="relative grid grid-cols-6 gap-6">
        {children}
        {trackbar}
      </HStack>
    </VStack>
  );
}
