import React from "react";
import { Text, View } from "react-native";
import { cva, VariantProps } from "class-variance-authority";
import { TruckIcon } from "lucide-react-native";

import { useColorsTheme } from "~/utils/constants";

const statusItemVariants = cva(
  "flex-row items-center justify-center gap-2 rounded-full border-4  px-3 py-4 shadow-sm",
  {
    variants: {
      variant: {
        "pick-up": "border-muted-foreground/10 bg-muted/20",
        shipping: "border-orange-300 bg-orange-50",
      },
    },
  },
);

const statusItemTextVariants = cva("text-base font-bold capitalize", {
  variants: {
    variant: {
      "pick-up": "text-muted-foreground",
      shipping: "text-orange-400",
    },
  },
});

interface StatusItemProps
  extends React.ComponentProps<typeof View>,
    VariantProps<typeof statusItemVariants> {}

export default function StatusItem({
  variant = "pick-up",
  className,
  ...props
}: StatusItemProps) {
  const colors = useColorsTheme();
  return (
    <View className={statusItemVariants({ variant, className })} {...props}>
      <TruckIcon size={20} color={colors.mutedForeground} />
      <Text
        style={{ width: "auto" }}
        className={statusItemTextVariants({ variant })}
      >
        {variant}
      </Text>
    </View>
  );
}
