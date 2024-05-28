import React from "react";
import { BellRingIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@qt/ui/popover";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export default function NotificationsPopover({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" className="h-96 w-96 overflow-hidden p-0">
        <VStack className="gap-0">
          <HStack className="w-full items-center border-b bg-muted/30 p-3">
            <BellRingIcon className="size-5" />
            <Text>Notifications</Text>
          </HStack>
          <VStack className="h-80 w-full gap-0 overflow-y-scroll">
            {Array.from({ length: 10 }).map((_, index) => (
              <HStack className="w-full border-b p-3" key={index}>
                <Text>Notification {index}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </PopoverContent>
    </Popover>
  );
}
