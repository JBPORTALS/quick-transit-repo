import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";
import { HomeIcon } from "lucide-react-native";

import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";

export default function HomeScreen() {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <View className="flex-1 items-center justify-center">
      <Tabs.Screen
        options={{
          title: "Home",
          headerTitle() {
            return (
              <Text
                className={cn(
                  "font-GeistBlack text-2xl tracking-wider",
                  isDarkColorScheme
                    ? "text-primary-foreground"
                    : "text-primary",
                )}
              >
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
