import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from ".";

const textVariants = cva("text-start font-normal text-foreground", {
  variants: {
    styles: {
      h1: "text-5xl font-extrabold ",
      h2: "text-4xl font-semibold leading-9",
      h3: "text-2xl font-semibold leading-8",
      h4: "text-xl font-semibold leading-7",
      large: "text-lg font-semibold leading-7",
      lead: "text-xl leading-6",
      p: "text-base leading-7",
      p_ui: "text-base leading-6",
      p_ui_medium: "text-base font-medium leading-6",
      list: "text-base leading-6",
      body: "text-sm leading-6",
      body_medium: "text-sm font-medium leading-6",
      subtle: "text-sm leading-5",
      subtle_medium: "text-sm font-medium leading-5",
      subtle_semibold: "text-sm font-semibold leading-5",
      small: "text-sm font-medium leading-4",
      details: "text-xs font-medium leading-5",
      blockquote: "text-base italic leading-6",
      inline_code: "text-sm font-bold leading-5",
      table_head: "text-base font-bold leading-6",
      table_item: "text-base leading-6",
    },
  },
  defaultVariants: {
    styles: "p",
  },
});

interface TextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

const Text = React.forwardRef<HTMLButtonElement, TextProps>(
  ({ className, styles, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        className={cn(textVariants({ styles, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text, textVariants };
