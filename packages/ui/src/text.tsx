import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from ".";

const textVariants = cva(
  "font-normal text-start",
  {
    variants: {
      styles: {
        h1:
          "font-extrabold text-5xl ",
        h2:
          "font-semibold text-4xl leading-9",
        h3:
          "font-semibold text-2xl leading-8",
        h4:
          "font-semibold text-xl leading-7",
        large: "font-semibold text-lg leading-7",
        lead:"text-xl leading-6",
        p:"text-base leading-7",
        p_ui:"text-base leading-6",
        p_ui_medium:"font-medium text-base leading-6",
        list:"text-base leading-6",
        body:"text-sm leading-6",
        body_medium:"font-medium text-sm leading-6",
        subtle:"text-sm leading-5",
        subtle_medium:"font-medium text-sm leading-5",
        subtle_semibold:"font-semibold text-sm leading-5",
        small:"font-medium text-sm leading-4",
        details:"font-medium text-xs leading-5",
        blockquote:"italic text-base leading-6",
        inline_code:"font-bold text-sm leading-5",
        table_head:"font-bold text-base leading-6",
        table_item:"text-base leading-6",
        
      },
      
    },
    defaultVariants: {
      styles: "p",
      
    },
  },
);

interface TextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

const Texts = React.forwardRef<HTMLButtonElement, TextProps>(
  ({ className, styles, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(textVariants({ styles, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Texts.displayName = "Text";

export { Texts, textVariants };

