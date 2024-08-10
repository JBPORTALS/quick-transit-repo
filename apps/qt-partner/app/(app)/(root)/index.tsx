import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";

import { Text } from "~/components/ui/text";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Tabs.Screen options={{ title: "Home" }} />
      <Text>RootScreen</Text>
    </View>
  );
}
