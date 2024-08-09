import React from "react";
import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function SignIn() {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <Button size={"lg"} className="w-full">
        <Text>Sign In</Text>
      </Button>
    </View>
  );
}
