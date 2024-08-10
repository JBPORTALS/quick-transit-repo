import "~/global.css";

import { Slot } from "expo-router";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(app)", // Assuming your main app flow starts here
};

export default function RootLayout() {
  return <Slot />;
}
