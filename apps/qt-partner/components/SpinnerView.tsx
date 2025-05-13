import { View } from "react-native";

import { ActivityIndicator } from "~/lib/native/activity-indicator";

export default function SpinnerView() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={38} className="text-foreground/40" />
    </View>
  );
}
