import React from "react";
import { Loader } from "lucide-react";

import { VStack } from "@qt/ui/stack";

export default function Loading() {
  return (
    <VStack className="h-full items-center justify-center">
      <Loader className="size-10 animate-spin text-primary" />
    </VStack>
  );
}
