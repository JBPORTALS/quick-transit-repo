import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from ".";

const StatusVariants = cva("w-fit rounded-lg px-3 text-center", {
  variants: {
    variant: {
      pending:
        "text-md flex items-center justify-center bg-yellow-300 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-50",
      success:
        " bg-green-200 text-green-900 dark:bg-green-700 dark:text-green-50",
      error: "bg-destructive text-destructive-foreground",
      primary:
        "rounded-xl border-2 border-primary/60 bg-primary/20 text-primary ",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface StatusProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof StatusVariants> {
  asChild?: boolean;
}

const Tags = React.forwardRef<HTMLDivElement, StatusProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(StatusVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Tags.displayName = "Status";

export { Tags, StatusVariants };
