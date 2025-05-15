import "~/global.css";

import * as React from "react";
import { AppState, View } from "react-native";
import { useFonts } from "expo-font";
import {
  router,
  Slot,
  SplashScreen,
  useFocusEffect,
  useSegments,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";

import { NAV_THEME } from "~/lib/constants";
import { supabase, SupabaseProvider } from "~/lib/supabase";
import { TRPCProvider } from "~/lib/trpc/api";
import { useColorScheme } from "~/lib/useColorScheme";
import { useSupabase } from "~/lib/useSupabase";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export const unstable_settings = {
  initialRouteName: "(root)",
};

function WithSplashScreenHandle({ children }: { children: React.ReactNode }) {
  const [loaded, error] = useFonts({
    GeistBlack: require("../assets/fonts/Geist-Black.otf"),
  });

  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();

  const segments = useSegments();

  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { isLoaded: isSessionLoaded, isLoggedin } = useSupabase();

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");

      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";

      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }

      if (!isSessionLoaded || !segments) return;

      const isAuthSegment = segments[0] === "(auth)";
      const isRootSegment = segments[0] === "(root)";

      if (isLoggedin && isAuthSegment) router.replace("/(root)/(tabs)");
      else if (!isLoggedin && isRootSegment) router.replace("/(auth)");

      setIsColorSchemeLoaded(true);
    })();
  }, [isColorSchemeLoaded, isSessionLoaded, segments, isLoggedin]);

  useFocusEffect(
    React.useCallback(() => {
      if (loaded && isColorSchemeLoaded) {
        SplashScreen.hide();
      }
    }, [loaded, isColorSchemeLoaded]),
  );

  if (!isColorSchemeLoaded) {
    return null;
  }

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkColorScheme
            ? NAV_THEME.dark.background
            : NAV_THEME.light.background,
        }}
      >
        {children}
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <TRPCProvider>
      <SupabaseProvider>
        <WithSplashScreenHandle>
          <Slot />
          <PortalHost />
        </WithSplashScreenHandle>
      </SupabaseProvider>
    </TRPCProvider>
  );
}
