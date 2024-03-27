import React from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Link, Tabs } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { BellIcon, HomeIcon, ListIcon, TruckIcon } from "lucide-react-native";

import NavItem from "~/components/nav-item";
import { useColorsTheme } from "~/utils/constants";

export default function TabLayout() {
  const { user } = useUser();
  const colors = useColorsTheme();

  return (
    <View className="flex h-full w-full">
      <Tabs
        sceneContainerStyle={{
          backgroundColor: colors.background,
        }}
        screenOptions={{
          tabBarShowLabel: false,
          headerTintColor: colors.primary,
          tabBarStyle: { height: 60, backgroundColor: colors.background },
          headerShadowVisible: false,
          headerRightContainerStyle: { paddingRight: 14 },
          headerLeftContainerStyle: { paddingLeft: 14 },
          headerBackgroundContainerStyle: {
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          tabBarActiveTintColor: colors.primary,
          headerTitleStyle: { display: "none" },
          headerLeft: (props) => {
            return (
              <Image
                source={require("assets/qt-logo.svg")}
                style={{ height: 40, width: 40, objectFit: "contain" }}
              />
            );
          },
          headerRight: () => {
            return (
              <Link href={"/profile"}>
                <Image
                  source={user?.imageUrl}
                  style={{
                    height: 32,
                    width: 32,
                    borderRadius: 9999,
                    borderColor: "gray",
                    borderWidth: 1,
                  }}
                />
              </Link>
            );
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <NavItem {...{ focused }}>
                <HomeIcon size={24} {...{ color }} />
              </NavItem>
            ),
          }}
        />
        <Tabs.Screen
          name="packages"
          options={{
            title: "Packages",
            tabBarIcon: ({ color, focused }) => (
              <NavItem {...{ focused }}>
                <ListIcon size={24} {...{ color }} />
              </NavItem>
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            tabBarBadge: "9+",
            tabBarBadgeStyle: { backgroundColor: colors.primary },
            tabBarIcon: ({ color, focused }) => (
              <NavItem {...{ focused }}>
                <BellIcon
                  className="bg-primary/30 p-3"
                  size={24}
                  {...{ color }}
                />
              </NavItem>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
