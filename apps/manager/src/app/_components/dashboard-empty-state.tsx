import React from "react";
import { PackageOpenIcon } from "lucide-react";

import { VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export default function DashboardEmptyState() {
  return (
    <VStack className="h-96 w-full border-spacing-1 items-center  justify-center rounded-radius border-2 border-dashed">
      <PackageOpenIcon className="size-20 text-muted-foreground/65" />
      <VStack className="items-center gap-1">
        <Text styles={"h4"}>No packages to track</Text>
        <Text styles={"small"} className="text-muted-foreground">
          There is currently no packages to track here.
        </Text>
      </VStack>
    </VStack>
  );
}
