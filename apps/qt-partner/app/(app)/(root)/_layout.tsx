import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={
          isDarkColorScheme ? NAV_THEME.dark.card : NAV_THEME.light.card
        }
      />
      <Stack initialRouteName="(tabs)" />
    </SafeAreaProvider>
  );
}
