import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";

import { supabase } from "~/lib/supabase";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

const createSessionFromUrl = async (url: string) => {
  const { params } = QueryParams.getQueryParams(url);

  console.log("params", params);

  const { access_token, refresh_token } = params;

  if (!access_token || !refresh_token) return null;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  console.log({ error, data });

  return { data, error };
};

function HandleAuthLink() {
  const url = Linking.useURL();

  const router = useRouter();

  React.useEffect(() => {
    if (url)
      createSessionFromUrl(url).then((value) => {
        if (value?.error) console.log(value.error);
      });
  }, [url]);

  return null;
}

export default function AuthLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        initialRouteName="index"
        screenOptions={{ headerShadowVisible: false }}
      />
      <HandleAuthLink />
    </SafeAreaProvider>
  );
}
