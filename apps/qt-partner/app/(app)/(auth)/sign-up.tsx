import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function SignUp() {
  return (
    <View className="flex-1 items-center px-4 py-2">
      <Stack.Screen
        options={{
          title: "Create Account",
          headerTitleAlign: "center",
        }}
      />
      <Text className="px-12 text-center text-muted-foreground">
        Start your first pick-up with by creating new account.
      </Text>
      <View className="w-full py-5">
        <Button size={"lg"} className="w-full">
          <Text>Submit</Text>
        </Button>
      </View>
    </View>
  );
}
