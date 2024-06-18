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
      <PopoverContent
        align="end"
        className="h-[490px] w-[450px] overflow-hidden p-0"
      >
        <VStack className="h-full w-full gap-0">
          <HStack className="w-full items-center border-b bg-muted/30 p-3">
            <Text>Notifications</Text>
          </HStack>
          <VStack className="h-full w-full gap-0 overflow-y-scroll">
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
