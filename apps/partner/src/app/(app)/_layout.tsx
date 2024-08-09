import { Link, Stack } from "expo-router";
import { SettingsIcon } from "lucide-react-native";

import { useColorsTheme } from "~/utils/constants";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colors = useColorsTheme();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerShown: false,
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.foreground,
        contentStyle: {
          backgroundColor: colors.secondary,
        },
        animation: "ios",
        headerBackTitleVisible: false,
        animationTypeForReplace: "pop",
      }}
      initialRouteName="(auth)"
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(stacks)/profile"
        options={{
          headerShown: true,
          title: "Profile Details",
          headerRight() {
            return (
              <Link href={"/settings"}>
                <SettingsIcon size={24} color={colors.foreground} />
              </Link>
            );
          },
        }}
      />
      <Stack.Screen
        name="(stacks)/settings"
        options={{
          headerShown: true,
          title: "Profile Settings",
        }}
      />

      <Stack.Screen
        name="(stacks)/package/[packageId]"
        options={{
          headerShown: true,
          title: "Package Details",
        }}
      />

      <Stack.Screen
        name="(stacks)/invoices/new"
        options={{
          headerShown: true,
          title: "Invoice",
        }}
      />

      <Stack.Screen
        name="(stacks)/take-pic-reciept/camera"
        options={{
          headerShown: false,
          title: "Camera",
        }}
      />
    </Stack>
  );
}
