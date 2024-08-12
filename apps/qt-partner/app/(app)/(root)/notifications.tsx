import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";
import { BellIcon } from "lucide-react-native";

import { Text } from "~/components/ui/text";

export default function Notifications() {
  return (
    <View className="flex-1 items-center justify-center">
      <Tabs.Screen
        options={{
          title: "Notifications",
          tabBarIcon: (props) => (
            <BellIcon size={props.size} color={props.color} />
          ),
        }}
      />
      <Text>Notifications</Text>
    </View>
  );
}
