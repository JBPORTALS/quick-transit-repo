import React from "react";
import { Slot } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function AuthLayout() {
  return <Slot initialRouteName="index" />;
}
