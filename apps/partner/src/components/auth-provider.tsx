import { useCallback, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "@clerk/clerk-expo";

interface AuthProviderProps extends React.ComponentProps<typeof View> {}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isLoaded } = useAuth();

  const onLayoutRootView = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [isLoaded]);

  return (
    <SafeAreaProvider>
      <View className="flex h-full w-full">{children}</View>
    </SafeAreaProvider>
  );
}
