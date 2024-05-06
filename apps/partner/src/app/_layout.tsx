import { TRPCProvider } from "~/utils/api";

import "../styles.css";

import { Link, Slot, Stack } from "expo-router";
// This is the main layout of the app
// It wraps your pages with the providers they need
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider } from "@clerk/clerk-expo";
import { SettingsIcon } from "lucide-react-native";

import AuthProvider from "~/components/auth-provider";
import { ColorsTheme } from "~/utils/constants";

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const CLERK_PUBLISHABLE_KEY =
  "pk_test_cHJldHR5LWhhd2stODkuY2xlcmsuYWNjb3VudHMuZGV2JA";

export default function RootLayout() {
  const colors = ColorsTheme();

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <AuthProvider>
        {/*Contains all navigation props based on auth */}
        <TRPCProvider>
          <StatusBar style="auto" backgroundColor={colors.background} />
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
          >
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
        </TRPCProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}
