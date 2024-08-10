import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { cva } from "class-variance-authority";

import { Text, TextClassContext } from "~/components/ui/text";
import { NAV_THEME } from "~/lib/constants";
import { cn } from "~/lib/utils";

const colors = NAV_THEME.light;

const buttonVariants = cva(
  "web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 group flex flex-row items-center justify-center gap-2 rounded-md disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "web:hover:opacity-90 bg-primary active:opacity-90",
        destructive: "web:hover:opacity-90 bg-destructive active:opacity-90",
        outline:
          "web:hover:bg-accent web:hover:text-accent-foreground border border-input bg-background active:bg-accent",
        secondary: "web:hover:opacity-80 bg-secondary active:opacity-80",
        ghost:
          "web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline ",
      },
      size: {
        default: "native:h-12 native:px-5 native:py-3 h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "native:h-14 h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonTextVariants = cva(
  "web:whitespace-nowrap native:text-base web:transition-colors text-sm font-medium text-foreground",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-destructive-foreground",
        outline: "group-active:text-accent-foreground",
        secondary:
          "text-secondary-foreground group-active:text-secondary-foreground",
        ghost: "group-active:text-accent-foreground",
        link: "text-primary group-active:underline",
      },
      size: {
        default: "",
        sm: "",
        lg: "native:text-lg",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    loadingText?: React.ReactNode;
  };

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      className,
      isLoading,
      loadingText,
      disabled,
      variant,
      size,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <TextClassContext.Provider
        value={cn(
          disabled && "web:pointer-events-none",
          buttonTextVariants({ variant, size }),
        )}
      >
        <Pressable
          className={cn(
            disabled && "web:pointer-events-none opacity-50",
            buttonVariants({ variant, size, className }),
          )}
          ref={ref}
          role="button"
          children={
            isLoading ? (
              <>
                <ActivityIndicator color={colors.background} />
                {loadingText ? loadingText : children}
              </>
            ) : (
              children
            )
          }
          disabled={disabled || isLoading}
          {...props}
        />
      </TextClassContext.Provider>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
