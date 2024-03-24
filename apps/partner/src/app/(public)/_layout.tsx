import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect, Slot, useRouter } from "expo-router";
import { useAuth, useSignIn } from "@clerk/clerk-expo";

export default function PublicRootLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href={"/"} />;

  return <Slot />;
}
