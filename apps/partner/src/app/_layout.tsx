import "~/global.css";

import { Slot } from "expo-router";
import { Theme, ThemeProvider } from "@react-navigation/native";

import { NAV_THEME } from "~/lib/constants";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(app)", // Main app flow start from this segment
};

const NAV_THEME_LIGHT: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
export default function MainAppLayout() {
  return (
    <ThemeProvider value={NAV_THEME_LIGHT}>
      <Slot />
    </ThemeProvider>
  );
}
