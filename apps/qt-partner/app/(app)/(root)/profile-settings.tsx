import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";

export default function ProfileSettings() {
  return (
    <View>
      <Stack.Screen options={{ title: "Profile Settings" }} />

      <Button
        size={"lg"}
        variant={"ghost"}
        className="justify-start rounded-none"
      >
        <Text>Documents</Text>
      </Button>
      <Separator />
      <Button
        size={"lg"}
        variant={"ghost"}
        className="justify-start rounded-none"
      >
        <Text className="native:active:text-destructive text-destructive">
          Log out
        </Text>
      </Button>
    </View>
  );
}
