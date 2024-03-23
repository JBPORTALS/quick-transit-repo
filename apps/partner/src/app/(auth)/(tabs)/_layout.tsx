import React from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link, Redirect, Tabs, useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { BellIcon, HomeIcon, ListIcon, TruckIcon } from "lucide-react-native";

export default function TabLayout() {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex h-full w-full">
      <View className="flex h-full w-full">
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#A83287",
            tabBarShowLabel: false,
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
              tabBarIcon: ({ color }) => <HomeIcon size={24} {...{ color }} />,
            }}
          />
          <Tabs.Screen
            name="packages"
            options={{
              title: "Packages",
              tabBarIcon: ({ color }) => <ListIcon size={24} {...{ color }} />,
            }}
          />
          <Tabs.Screen
            name="notifications"
            options={{
              title: "Notifications",
              tabBarIcon: ({ color }) => <BellIcon size={24} {...{ color }} />,
            }}
          />
        </Tabs>
      </View>
    </SafeAreaView>
  );
}
