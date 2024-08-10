import React from "react";
import { Stack } from "expo-router";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{ headerShadowVisible: false }}
    />
  );
}
