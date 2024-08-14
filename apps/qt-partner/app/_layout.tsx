import "~/global.css";

import * as React from "react";
import { AppState } from "react-native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";

import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { NAV_THEME } from "~/lib/constants";
import { supabase, SupabaseProvider } from "~/lib/supabase";
import { useColorScheme } from "~/lib/useColorScheme";
import { useSupabase } from "~/lib/useSupabase";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
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

  const { colorScheme, setColorScheme } = useColorScheme();

  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { isLoaded: isSessionLoaded } = useSupabase();

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

      await setAndroidNavigationBar(colorScheme); //set the theme for Android bottom NavigationBar

      setIsColorSchemeLoaded(true);
    })().finally(() => {
      if (loaded || error || isSessionLoaded) {
        SplashScreen.hideAsync();
      }
    });
  }, [loaded, error]);

  if (!isColorSchemeLoaded) {
    return null;
  }

  if (!loaded && !error) {
    return null;
  }

  return <>{children}</>;
}

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <SupabaseProvider>
        <WithSplashScreenHandle>
          <StatusBar
            backgroundColor={
              isDarkColorScheme
                ? DARK_THEME.colors.background
                : LIGHT_THEME.colors.background
            }
            style={isDarkColorScheme ? "light" : "dark"}
          />
          <Slot />
          <PortalHost />
        </WithSplashScreenHandle>
      </SupabaseProvider>
    </ThemeProvider>
  );
}
