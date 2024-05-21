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
    <HStack className="relative grid w-full grid-cols-6 gap-6">
      {children}
      {trackbar}
    </HStack>
  );
}
