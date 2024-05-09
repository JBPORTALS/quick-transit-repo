import type { VariantProps } from "class-variance-authority";
import React, { cloneElement } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { cva, cx } from "class-variance-authority";

const buttonVariants = cva(
  "flex-row items-center justify-center gap-3 rounded-md px-5 py-3 disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        ghost: "border border-border bg-transparent",
      },
      size: {
        sm: "px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const buttonTextVariants = cva("text-xl", {
  variants: {
    variant: {
      primary: "text-primary-foreground",
      ghost: "text-secondary-foreground",
    },
    size: {
      sm: "text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends React.ComponentProps<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  textClassName?: string;
  leftIcon?: React.ReactElement<any>;
  rightIcon?: React.ReactElement<any>;
  isLoading?: boolean;
}

export default function Button({
  children,
  className,
  variant,
  textClassName,
  size,
  leftIcon,
  rightIcon,
  isLoading,
  disabled = isLoading,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      className={buttonVariants({ className, variant, size })}
      {...props}
    >
      {leftIcon && !isLoading && <View>{cloneElement(leftIcon)}</View>}

      {isLoading ? (
        <ActivityIndicator
          size={24}
          className={cx([
            variant === "primary"
              ? "text-primary-foreground"
              : "text-secondary-foreground",
          ])}
        />
      ) : (
        <Text
          className={buttonTextVariants({
            variant,
            className: textClassName,
            size,
          })}
        >
          {children}
        </Text>
      )}
      {rightIcon && !isLoading && <View>{cloneElement(rightIcon)}</View>}
    </TouchableOpacity>
  );
}
