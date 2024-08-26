import { View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function VerifyToken() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Stack.Screen options={{ headerShown: false }} />
      <Text>Invalid Email Link</Text>

      <Button onPress={() => router.back()}>
        <Text>Go Back</Text>
      </Button>
    </View>
  );
}
