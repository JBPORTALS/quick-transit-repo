import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { Files } from "~/lib/icons/Files";
import { LogOut } from "~/lib/icons/LogOut";
import { supabase } from "~/lib/supabase";

export default function ProfileSettings() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const onSignOut = useCallback(async () => {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
  }, []);
  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: "Profile Settings" }} />

      <Button
        size={"lg"}
        variant={"ghost"}
        className="w-full justify-start rounded-none"
      >
        <Text>Documents</Text>
        <Files size={20} className="ml-auto text-foreground" />
      </Button>
      <Separator />
      <Button
        size={"lg"}
        variant={"ghost"}
        isLoading={isSigningOut}
        onPress={() => onSignOut()}
        className="w-full justify-start rounded-none"
      >
        <Text className="native:active:text-destructive text-destructive">
          Log out
        </Text>
        <LogOut size={20} className="ml-auto text-destructive" />
      </Button>
    </View>
  );
}
