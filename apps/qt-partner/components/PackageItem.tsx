import React from "react";
import { View } from "react-native";

import { RouterOutputs } from "@qt/api";

import { PackageIcon } from "~/lib/icons/PackageIcon";
import { cn } from "~/lib/utils";
import { Badge } from "./ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Text } from "./ui/text";
import { H1 } from "./ui/typography";

export const PackageItem = React.forwardRef<
  React.ComponentRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    data:
      | RouterOutputs["packages"]["search"]["packages"][0]
      | RouterOutputs["packages"]["getAllAssignedPackagesForToday"]["packages"][0];
  }
>(({ data }, ref) => {
  const { current_status, package: packageDetails } = data;

  if (!packageDetails) return null;

  return (
    <Card ref={ref} className="w-full flex-row items-center pl-5">
      <View className="aspect-square min-w-20 max-w-20 items-center  justify-center rounded-md border border-border bg-muted/20">
        <H1>📦</H1>
      </View>
      <CardHeader className="w-full flex-shrink gap-2">
        <View>
          <CardTitle className="text-lg font-bold">
            {packageDetails.title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {packageDetails.description.length > 40
              ? packageDetails.description.slice(0, 40).concat("...")
              : packageDetails.description}
          </CardDescription>
        </View>
        <Badge variant={"outline"}>
          <Text
            className={cn(
              "text-sm font-bold capitalize",
              current_status === "confirmed" && "text-indigo-400",
              current_status === "cancelled" && "text-red-400",
              current_status === "pickedup" && "text-amber-600",
              current_status === "delivered" && "text-green-600",
            )}
          >
            {current_status === "confirmed" ? "Pick Up" : current_status}
          </Text>
        </Badge>
      </CardHeader>
    </Card>
  );
});
