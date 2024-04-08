import { TRPCProvider } from "~/utils/api";

import "../styles.css";

import { Link, Redirect, Slot, Stack } from "expo-router";
// This is the main layout of the app
// It wraps your pages with the providers they need
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider, SignedIn, useAuth } from "@clerk/clerk-expo";
import { SettingsIcon } from "lucide-react-native";

import AuthProvider from "~/components/auth-provider";
import { useColorsTheme } from "~/utils/constants";

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

export const unstable_settings = {
  initialRouteName: "(auth)",
};

const CLERK_PUBLISHABLE_KEY =
  "pk_test_cHJldHR5LWhhd2stODkuY2xlcmsuYWNjb3VudHMuZGV2JA";

export default function RootLayout() {
  const colors = useColorsTheme();

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <AuthProvider>
        {/*Contains all navigation props based on auth */}
        <TRPCProvider>
          <StatusBar style="auto" backgroundColor={colors.background} />
          <Slot />
        </TRPCProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}
