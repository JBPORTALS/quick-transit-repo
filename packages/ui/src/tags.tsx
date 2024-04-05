import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from ".";

const StatusVariants = cva(
  "px-3 rounded-lg text-center",
  {
    variants: {
      variant: {
        pending:
          "bg-yellow-300 text-md text-yellow-800 flex items-center justify-center",
          success:
          " bg-green-200 text-green-900",
          error:
          "bg-destructive/30 text-red-900",
          primary:
          "bg-primary/20 text-primary rounded-xl border-2 border-primary/60 "
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

const Tags = React.forwardRef<HTMLDivElement, StatusProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(StatusVariants({ variant,  className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Tags.displayName = "Status";

export { Tags, StatusVariants };
