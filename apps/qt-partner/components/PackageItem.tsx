import React from "react";
import { View } from "react-native";

import { RouterOutputs } from "@qt/api";

import { PackageIcon } from "~/lib/icons/PackageIcon";
import { cn } from "~/lib/utils";
import { Badge } from "./ui/badge";
import { Text } from "./ui/text";

export const PackageItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    data: RouterOutputs["packages"]["search"]["packages"][0];
  }
>(({ data }, ref) => {
  const { current_status, package: packageDetails } = data;

  if (!packageDetails) return null;

  return (
    <View ref={ref} className="w-full flex-grow-0 flex-row gap-3">
      <View className="aspect-square min-w-24 max-w-24 items-center  justify-center rounded-md border border-border bg-muted/20">
        <PackageIcon
          strokeWidth={1.25}
          size={32}
          className="text-muted-foreground "
        />
      </View>
      <View className="w-full flex-shrink gap-2">
        <Text className="font-bold">{packageDetails.title}</Text>
        <Text className="text-sm text-muted-foreground">
          {packageDetails.description.length > 40
            ? packageDetails.description.slice(0, 40).concat("...")
            : packageDetails.description}
        </Text>
        <Badge variant={"secondary"}>
          <Text
            className={cn(
              "text-sm font-bold capitalize",
              current_status === "confirmed" && "text-indigo-400",
              current_status === "cancelled" && "text-red-400",
              current_status === "shipping" && "text-amber-600",
              current_status === "delivered" && "text-green-600",
            )}
          >
            {current_status === "confirmed" ? "Pick Up" : current_status}
          </Text>
        </Badge>
      </View>
    </View>
  );
});
