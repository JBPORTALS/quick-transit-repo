import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { useSupabase } from "~/lib/useSupabase";

export default function AppLayout() {
  const { isLoggedin: isAuthenticated } = useSupabase();

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
