import { useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter, withLayoutContext } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

import { NAV_THEME } from "~/lib/constants";

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
  const colors = NAV_THEME.light;

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
            borderColor: colors.border,
            elevation: 0,
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
