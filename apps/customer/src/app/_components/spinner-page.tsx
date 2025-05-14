import { HTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@qt/ui";

export function SpinnerPage({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center py-40",
        className,
      )}
      {...props}
    >
      <LoaderCircle
        strokeWidth={1.25}
        className="size-8 animate-spin text-foreground/60"
      />
    </div>
  );
}
