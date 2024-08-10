import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

import { NAV_THEME } from "~/lib/constants";
import StatusItem from "./status-item";

interface PackageItemProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  data: { title: string; time: string };
}

export const PackageItem = React.forwardRef<TouchableOpacity, PackageItemProps>(
  ({ data, ...props }, ref) => {
    const colors = NAV_THEME.light;

    return (
      <TouchableOpacity
        {...props}
        ref={ref}
        className="flex w-full flex-row gap-3 overflow-visible rounded-md border border-border bg-card p-4"
      >
        <Image
          source={require("assets/package-1.jpg")}
          style={{
            width: 100,
            height: "auto",
            borderRadius: 4,
            borderColor: colors.border,
            borderWidth: 1,
          }}
        />
        <View className="flex w-full items-start justify-between gap-2">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            lineBreakMode="tail"
            lineBreakStrategyIOS="standard"
            textBreakStrategy="highQuality"
            className="w-[65%] text-foreground"
          >
            {data.title}
          </Text>
          <Text className="text-sm text-muted-foreground">{data.time}</Text>
          <StatusItem size={"sm"} variant={"shipping"} />
        </View>
      </TouchableOpacity>
    );
  },
);
