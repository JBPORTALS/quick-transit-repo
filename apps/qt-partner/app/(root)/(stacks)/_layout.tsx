import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen
          name="package/[id]/index"
          options={{ title: "Package Details" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
