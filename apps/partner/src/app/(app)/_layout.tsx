import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { NAV_THEME } from "~/lib/constants";
import { useSupabase } from "~/utils/supabase";

export const unstable_settings = {
  initialRouteName: "(root)",
};

export default function AppLayout() {
  const { isLoggedIn } = useSupabase();
  const colors = NAV_THEME.light;
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.background} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(root)" redirect={!isLoggedIn} />
        <Stack.Screen name="(auth)" redirect={isLoggedIn} />
      </Stack>
    </SafeAreaProvider>
  );
}
