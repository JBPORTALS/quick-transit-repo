import { TRPCProvider } from "~/utils/api";

import "../styles.css";

import { StatusBar } from "react-native";
import { Slot, useRouter, useSegments } from "expo-router";
// This is the main layout of the app
// It wraps your pages with the providers they need
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, SignedIn } from "@clerk/clerk-expo";

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
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <StatusBar barStyle="dark-content" backgroundColor={"#ffffff"} />
        <Slot />
      </TRPCProvider>
    </ClerkProvider>
  );
}
