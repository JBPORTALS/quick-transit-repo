import React from "react";
import { Slot } from "expo-router";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

export default function AuthLayout() {
  return <Slot initialRouteName="index" />;
}
