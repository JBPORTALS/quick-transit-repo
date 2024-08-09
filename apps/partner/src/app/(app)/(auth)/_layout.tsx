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

import { useColorsTheme } from "~/utils/constants";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
  const { width } = Dimensions.get("screen");
  const theme = useColorsTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#fff" />
      <View className="w-fit  items-center gap-3 bg-white p-8">
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
          tabBarIndicatorStyle: {
            backgroundColor: theme.primary,
          },
        }}
        initialRouteName="sign-in"
      >
        <MaterialTopTabs.Screen name="sign-in" options={{ title: "Sign In" }} />
        <MaterialTopTabs.Screen name="sign-up" options={{ title: "Sign Up" }} />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}
