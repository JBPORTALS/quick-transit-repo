import "~/global.css";

import * as React from "react";
import { AppState, View } from "react-native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";

import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
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

function WithSplashScreenHandle({ children }: { children: React.ReactNode }) {
  const [loaded, error] = useFonts({
    GeistBlack: require("../assets/fonts/Geist-Black.otf"),
  });

  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();

  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { isLoaded: isSessionLoaded } = useSupabase();

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");

      if (!theme) {
        setAndroidNavigationBar(colorScheme);
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      setAndroidNavigationBar(colorScheme);

      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }

      setIsColorSchemeLoaded(true);
    })();
  }, [isColorSchemeLoaded]);

  useFocusEffect(
    React.useCallback(() => {
      if (isSessionLoaded && loaded) {
        SplashScreen.hide();
      }
    }, [isSessionLoaded, loaded]),
  );

  if (!isColorSchemeLoaded) {
    return null;
  }

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar
        style={isDarkColorScheme ? "light" : "dark"}
        backgroundColor="transparent"
      />
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
