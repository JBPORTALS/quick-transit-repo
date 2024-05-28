import React from "react";

import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <VStack className="h-full w-full gap-5">
      <HStack className="w-full items-center justify-between">
        <Text styles={"lead"} className="font-medium">
          Your Recent Requests
        </Text>
      </HStack>
      <HStack className="relative grid w-full grid-cols-6 gap-6">
        {children}
      </HStack>
    </VStack>
  );
}
