import React from "react";
import { Image } from "expo-image";
import { Link, Redirect, Tabs } from "expo-router";
import { BellIcon, HomeIcon, ListIcon } from "lucide-react-native";

import NavItem from "~/components/nav-item";
import { NAV_THEME } from "~/lib/constants";

export const unstable_settings = {
  initialRouteName: "home", // Assuming your main app flow starts here
};

export default function TabLayout() {
  const colors = NAV_THEME.light;

  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: colors.background,
      }}
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: false,
        headerTintColor: colors.primary,
        tabBarStyle: {
          height: 72,
          backgroundColor: colors.background,
          paddingBottom: 10,
          borderColor: colors.border,
        },
        headerShadowVisible: false,
        headerRightContainerStyle: { paddingRight: 14 },
        headerLeftContainerStyle: { paddingLeft: 14 },
        headerStyle: {
          backgroundColor: colors.background,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        headerTitleStyle: { display: "none" },
        headerLeft: () => {
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
                source={{ uri: "https://github.com/shadcn.png" }}
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

          tabBarIcon: ({ color, focused, size }) => (
            <NavItem {...{ focused }}>
              <HomeIcon size={size} {...{ color }} />
            </NavItem>
          ),
        }}
      />
      <Tabs.Screen
        name="packages"
        options={{
          title: "Packages",
          tabBarIcon: ({ color, focused, size }) => (
            <NavItem {...{ focused }}>
              <ListIcon size={size} {...{ color }} />
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
          tabBarIcon: ({ color, focused, size }) => (
            <NavItem {...{ focused }}>
              <BellIcon
                className="bg-primary/30 p-3"
                size={size}
                {...{ color }}
              />
            </NavItem>
          ),
        }}
      />
    </Tabs>
  );
}
