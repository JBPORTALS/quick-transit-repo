import React from "react";
import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-svh w-full items-center justify-center">
      <Loader2Icon
        strokeWidth={1.25}
        className="size-8 animate-spin text-foreground/70"
      />
    </div>
  );
}
