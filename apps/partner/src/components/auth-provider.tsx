import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Stack,
  useNavigation,
  useRootNavigationState,
  useRouter,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "@clerk/clerk-expo";

import { useColorsTheme } from "~/utils/constants";

interface AuthProviderProps extends React.ComponentProps<typeof View> {}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const colors = useColorsTheme();

  const onLayoutRootView = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [isLoaded]);

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <View className="flex h-full w-full">{children}</View>
    </SafeAreaProvider>
  );
}
