import { View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { Stack } from "expo-router";
import { MailCheckIcon } from "lucide-react-native";

import { Text } from "~/components/ui/text";

const AnimatedEmailSent = Animated.createAnimatedComponent(MailCheckIcon);

export default function EmailSent() {
  return (
    <View className="native:gap-3 flex-1 items-center justify-center px-4 py-2">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <AnimatedEmailSent
        entering={ZoomIn.duration(200)}
        strokeWidth={1.5}
        size={102}
        color={"green"}
      />

      <Text className="px-12 text-center text-2xl font-bold">
        Confirm Your Email
      </Text>
      <Text className="px-12 text-center text-muted-foreground">
        Open your email app. We sent you an email to verify.
      </Text>
    </View>
  );
}
