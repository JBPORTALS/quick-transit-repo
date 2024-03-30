import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { ArrowUpRightFromCircle, TruckIcon } from "lucide-react-native";

import { useColorsTheme } from "~/utils/constants";
import StatusItem from "./status-item";

interface PackageItemProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  data: { title: string; time: string };
}

export default function PackageItem({ data, ...props }: PackageItemProps) {
  const colors = useColorsTheme();

  return (
    <TouchableOpacity
      {...props}
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
}
