import React from "react";
import { Text, View } from "react-native";

import Button from "~/components/button";

export default function NewInvoice() {
  return (
    <View className="h-full items-center justify-between p-4">
      <Text className="text-2xl font-bold text-foreground">NewInvoice</Text>
      <Button className="w-full">Ok, Submit</Button>
    </View>
  );
}
