import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function AppLayout() {
  const isAuthenticated = false;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(auth)"
          redirect={isAuthenticated} //if user authenticated redirect ...
        />
        <Stack.Screen
          name="(root)"
          redirect={!isAuthenticated} //if user not authenticated redirect ...
        />
      </Stack>
    </SafeAreaView>
  );
}
