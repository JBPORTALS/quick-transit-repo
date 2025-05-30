import { Redirect, Slot, Stack } from "expo-router";

import { useSupabase } from "~/lib/useSupabase";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const { isLoggedin } = useSupabase();

  if (!isLoggedin) <Redirect href={"/(auth)"} />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
