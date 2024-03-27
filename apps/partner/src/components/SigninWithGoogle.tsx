import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import { useOAuth } from "@clerk/clerk-expo";

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import Button from "./button";

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
    <Button className="mt-5 w-full" onPress={handleSignInWithGooglePress}>
      Continue with google
    </Button>
  );
};

export default SignInWithGoogle;
