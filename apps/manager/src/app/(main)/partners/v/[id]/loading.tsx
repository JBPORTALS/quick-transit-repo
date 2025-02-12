import React from "react";
import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <LoaderCircleIcon
        strokeWidth={1}
        className="size-10 animate-spin duration-1000"
      />
    </div>
  );
}
