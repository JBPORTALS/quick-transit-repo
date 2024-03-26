import { Link, Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { SettingsIcon } from "lucide-react-native";

export default function AuthLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <Redirect href={"/signin"} />;

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerShown: false,
      }}
      initialRouteName="(stacks)/settings"
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(stacks)/profile"
        options={{
          headerShown: true,
          title: "Profile Details",
          headerRight(props) {
            return (
              <Link href={"/(auth)/(stacks)/settings"}>
                <SettingsIcon size={24} color={"black"} />
              </Link>
            );
          },
        }}
      />
      <Stack.Screen
        name="(stacks)/settings"
        options={{
          headerShown: true,
          title: "Profile Settings",
        }}
      />
    </Stack>
  );
}
