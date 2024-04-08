import React from "react";
import { Text, View } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function PublicRootLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href={"/"} />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
