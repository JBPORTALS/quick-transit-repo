import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";
import { HomeIcon } from "lucide-react-native";

import { Text } from "~/components/ui/text";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Tabs.Screen
        options={{
          title: "Home",
          headerTitle() {
            return (
              <Text className="font-GeistBlack text-[21px] tracking-wider">
                QT Partner
              </Text>
            );
          },
          tabBarIcon: (props) => (
            <HomeIcon size={props.size} color={props.color} />
          ),
        }}
      />
      <Text>RootScreen</Text>
    </View>
  );
}
