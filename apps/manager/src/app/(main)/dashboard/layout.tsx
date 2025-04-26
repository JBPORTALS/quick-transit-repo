import React from "react";

import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { api } from "~/trpc/server";

export default async function layout({
  children,
  trackbar,
}: {
  children: React.ReactNode;
  trackbar: React.ReactNode;
}) {
  const user = await api.auth.getUser();
  return (
    <VStack className="h-full w-full gap-5">
      <HStack className="w-full items-center justify-between">
        <Text styles={"lead"} className="font-medium text-accent-foreground/80">
          Hello, {user?.name}
        </Text>
      </HStack>
      <HStack className="relative grid w-full grid-cols-6 gap-6">
        {children}
        {trackbar}
      </HStack>
    </VStack>
  );
}
