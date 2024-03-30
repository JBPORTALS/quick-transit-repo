import React from "react";
import { Text, View } from "react-native";
import { cva, VariantProps } from "class-variance-authority";
import { icons } from "lucide-react-native";
import twcolors from "tailwindcss/colors";

import { useColorsTheme } from "~/utils/constants";

const statusItemVariants = cva(
  "flex-row items-center justify-center gap-2 rounded-full ",
  {
    variants: {
      variant: {
        "pick-up": "border-muted-foreground/20",
        shipping:
          "border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-950",
        delivered:
          "border-green-500 bg-green-50 dark:border-green-700 dark:bg-green-950",
      },
      size: {
        default: "border-4 px-3 py-4 shadow-sm",
        sm: "border-2 px-3 py-1 shadow-none ",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "pick-up",
    },
  },
);

const statusItemTextVariants = cva("capitalize", {
  variants: {
    variant: {
      "pick-up": "text-muted-foreground",
      shipping: "text-orange-400",
      delivered: "text-green-500",
    },
    size: {
      default: "text-base font-bold ",
      sm: "text-xs font-medium",
    },
  },
  defaultVariants: {
    variant: "pick-up",
    size: "default",
  },
});

interface StatusItemProps
  extends React.ComponentProps<typeof View>,
    VariantProps<typeof statusItemVariants> {}

export default function StatusItem({
  variant = "pick-up",
  className,
  size,
  ...props
}: StatusItemProps) {
  const colors = useColorsTheme();
  const LucideIcon =
    icons[
      variant === "pick-up"
        ? "Truck"
        : variant === "shipping"
          ? "ArrowUpRight"
          : "PackageCheck"
    ];

  return (
    <View
      className={statusItemVariants({ variant, className, size })}
      {...props}
    >
      <LucideIcon
        size={size === "sm" ? 14 : 22}
        color={
          variant === "pick-up"
            ? colors.mutedForeground
            : variant === "shipping"
              ? twcolors.orange[400]
              : variant === "delivered"
                ? twcolors.green[500]
                : undefined
        }
      />
      <Text
        style={{ width: "auto" }}
        className={statusItemTextVariants({ variant, size })}
      >
        {variant}
      </Text>
    </View>
  );
}
