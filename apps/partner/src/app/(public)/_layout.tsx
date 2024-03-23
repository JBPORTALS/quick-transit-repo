import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect, Slot, useRouter } from "expo-router";
import { useAuth, useSignIn } from "@clerk/clerk-expo";

export default function PublicRootLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (isLoaded && isSignedIn) router.push("/");
  }, [isSignedIn, isLoaded]);

  if (!isLoaded)
    return (
      <View className={"flex h-full w-full items-center justify-center"}>
        <ActivityIndicator size={40} color={"#BD3C9C"} />
      </View>
    );

  return <Slot />;
}
