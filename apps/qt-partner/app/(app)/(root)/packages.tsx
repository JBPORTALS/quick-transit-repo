import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";

import { Text } from "~/components/ui/text";

export default function Packages() {
  return (
    <View className="flex-1 items-center justify-center">
      <Tabs.Screen options={{ title: "Packages" }} />
      <Text>Packages</Text>
    </View>
  );
}
