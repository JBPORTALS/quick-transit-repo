import React from "react";
import { Dimensions, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { withLayoutContext } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export const unstable_settings = {
  initialRouteName: "index", // Assuming your main app flow starts here
};

export default function Layout() {
  const { width } = Dimensions.get("screen");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View className="w-fit  items-center gap-3 bg-background p-8">
        <View className="h-fit w-fit flex-row items-center justify-center rounded-full border border-border px-4 py-1">
          <Image
            source={require("assets/qt-logo.svg")}
            style={{
              height: 24,
              width: 24,
            }}
          />
          <Text className="text-base text-foreground">Quick Transitt</Text>
        </View>
        <Text className="text-center text-xl text-foreground">
          Your Fast and Reliable Package Transfer Solution
        </Text>
        <Text className="text-center text-base text-muted-foreground">
          Effortlessly manage package transportation between customers and
          transport agencies with our user-friendly app.
        </Text>
      </View>
      <MaterialTopTabs
        screenOptions={{
          tabBarLabelStyle: { fontSize: 16, textTransform: "capitalize" },
          tabBarItemStyle: { width: width / 2 },
          tabBarIndicatorStyle: {},
          tabBarStyle: {
            borderBottomWidth: 1,
          },
        }}
        initialRouteName="index"
      >
        <MaterialTopTabs.Screen name="index" options={{ title: "Sign In" }} />
        <MaterialTopTabs.Screen name="sign-up" options={{ title: "Sign Up" }} />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}
