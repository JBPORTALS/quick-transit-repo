import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from ".";

const StatusVariants = cva(
  "flex w-fit items-center justify-center  gap-2 rounded-full px-4 py-[3px] text-center text-sm",
  {
    variants: {
      variant: {
        pending:
          " bg-yellow-300 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-50",
        success: " bg-green-200 dark:bg-green-900 dark:text-green-50",
        gray: "border-2 bg-card",
        error: "bg-destructive text-destructive-foreground",
        primary: "border-2 border-primary/60 bg-primary/10 text-primary",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

interface StatusProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof StatusVariants> {
  asChild?: boolean;
}

const Tag = React.forwardRef<HTMLDivElement, StatusProps>(
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
Tag.displayName = "Status";

export { Tag, StatusVariants };