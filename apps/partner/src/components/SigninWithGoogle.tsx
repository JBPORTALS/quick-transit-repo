import React from "react";
import * as AuthSession from "expo-auth-session";
import { Image } from "expo-image";
import { useOAuth } from "@clerk/clerk-expo";

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import Button from "./button";

const SignInWithGoogle = () => {
  useWarmUpBrowser();

  const redirectUrl = AuthSession.makeRedirectUri({
    path: "/(auth)/(tabs)",
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
    <Button
      variant={"ghost"}
      className="mt-5 w-full"
      leftIcon={
        <Image
          source={require("assets/google.svg")}
          style={{ height: 24, width: 24 }}
        />
      }
      onPress={handleSignInWithGooglePress}
    >
      Continue with google
    </Button>
  );
};

export default SignInWithGoogle;
