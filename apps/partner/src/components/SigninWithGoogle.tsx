import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import { useOAuth } from "@clerk/clerk-expo";

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

const SignInWithGoogle = () => {
  useWarmUpBrowser();

  const redirectUrl = AuthSession.makeRedirectUri({
    path: "/",
  });

  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
    redirectUrl,
  });

  const handleSignInWithGooglePress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  return (
    <TouchableOpacity
      className="mt-5 w-full"
      onPress={handleSignInWithGooglePress}
    >
      <View className="flex w-full items-center justify-center rounded-md bg-[#BD3C9C] px-5 py-3 text-white">
        <Text className="text-lg font-medium text-white">
          Continue with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SignInWithGoogle;
