import { cloneElement } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "flex-row items-center justify-center gap-3 rounded-md px-5 py-3",
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
  leftIcon?: React.ReactComponentElement<any>;
  rightIcon?: React.ReactComponentElement<any>;
}

export default function Button({
  children,
  className,
  variant,
  textClassName,
  size,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={buttonVariants({ className, variant, size })}
      {...props}
    >
      {leftIcon && <View>{cloneElement(leftIcon)}</View>}
      <Text
        className={buttonTextVariants({
          variant,
          className: textClassName,
          size,
        })}
      >
        {children}
      </Text>
      {rightIcon && <View>{cloneElement(rightIcon)}</View>}
    </TouchableOpacity>
  );
}
