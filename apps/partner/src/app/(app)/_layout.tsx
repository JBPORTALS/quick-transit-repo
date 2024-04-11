import { Link, Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { SettingsIcon } from "lucide-react-native";

import { ColorsTheme } from "~/utils/constants";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function AuthLayout() {
  const { isSignedIn } = useAuth();
  const colors = ColorsTheme();

  if (!isSignedIn) return <Redirect href={"/sign-in"} />;

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
      }}
      initialRouteName="(tabs)"
    >
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
