import React from "react";
import { PackageOpenIcon } from "lucide-react";

import { VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export function DashboardEmptyState() {
  return (
    <VStack className="h-96 w-full items-center  justify-center rounded-radius border">
      <VStack className="items-center gap-1">
        <Text styles={"h4"}>No packages to track</Text>
        <Text
          styles={"small"}
          className="w-4/6 text-wrap text-center text-muted-foreground"
        >
          Assign partners to the packages and track the status of the packages
          over here.
        </Text>
      </VStack>
    </VStack>
  );
}
