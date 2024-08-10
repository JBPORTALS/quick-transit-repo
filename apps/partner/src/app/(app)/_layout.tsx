import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { NAV_THEME } from "~/lib/constants";

export const unstable_settings = {
  initialRouteName: "(root)",
};

export default function AppLayout() {
  const isAuthenticated = true;
  const colors = NAV_THEME.light;
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.background} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(root)" redirect={isAuthenticated} />
        <Stack.Screen name="(auth)" redirect={!isAuthenticated} />
      </Stack>
    </SafeAreaProvider>
  );
}
