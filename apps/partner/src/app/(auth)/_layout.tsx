import { Redirect, Slot, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { SettingsIcon } from "lucide-react-native";

export default function AuthLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <Redirect href={"/signin"} />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(stacks)/profile"
        options={{
          headerShown: true,
          title: "Profile Details",
          headerRight(props) {
            return <SettingsIcon size={24} color={"black"} />;
          },
        }}
      />
    </Stack>
  );
}
