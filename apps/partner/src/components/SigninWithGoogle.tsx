import React from "react";
import { Button, View } from "react-native";
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
        signIn?.reload();
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button
        title="Sign in with Google"
        onPress={handleSignInWithGooglePress}
      />
    </View>
  );
};

export default SignInWithGoogle;
