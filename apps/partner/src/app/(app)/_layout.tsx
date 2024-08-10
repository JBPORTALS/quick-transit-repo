import { Link, Stack } from "expo-router";
import { SettingsIcon } from "lucide-react-native";

import { NAV_THEME } from "~/lib/constants";

// SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(tabs)", // Assuming your main app flow starts here
};

export default function RootLayout() {
  const colors = NAV_THEME.light;

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerShown: false,
        // headerStyle: { backgroundColor: colors.card },
        // headerTintColor: colors.foreground,
        // contentStyle: {
        //   backgroundColor: colors.secondary,
        // },
        animation: "ios",
        headerBackTitleVisible: false,
        animationTypeForReplace: "pop",
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          title: "Profile Details",
          headerRight() {
            return (
              <Link href={"/settings"}>
                <SettingsIcon size={24} color={colors.text} />
              </Link>
            );
          },
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "Profile Settings",
        }}
      />

      <Stack.Screen
        name="package/[packageId]"
        options={{
          headerShown: true,
          title: "Package Details",
        }}
      />

      <Stack.Screen
        name="invoices/new"
        options={{
          headerShown: true,
          title: "Invoice",
        }}
      />

      <Stack.Screen
        name="take-pic-reciept/camera"
        options={{
          headerShown: false,
          title: "Camera",
        }}
      />
    </Stack>
  );
}
