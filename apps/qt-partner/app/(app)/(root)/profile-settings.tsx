import React from "react";
import { Text, View } from "react-native";
import { Stack } from "expo-router";

export default function ProfileSettings() {
  return (
    <View>
      <Stack.Screen options={{ title: "Profile Settings" }} />
      <Text>ProfileSettings</Text>
    </View>
  );
}
