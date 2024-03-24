import React from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link, Redirect, Tabs, useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { BellIcon, HomeIcon, ListIcon, TruckIcon } from "lucide-react-native";

import NavItem from "~/components/nav-item";

export default function TabLayout() {
  const { user } = useUser();

  return (
    <View className="flex h-full w-screen">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#A83287",
          tabBarShowLabel: false,
          tabBarStyle: { height: 60 },
          header: (props) => {
            return (
              <View className="flex h-16 w-full flex-row  items-center justify-between bg-white px-4 shadow-md">
                <TruckIcon size={32} color={"#A83287"} />
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
              </View>
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
