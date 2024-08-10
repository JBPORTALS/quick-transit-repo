import { View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { MailCheckIcon } from "lucide-react-native";

import { Text } from "~/components/ui/text";
import { NAV_THEME } from "~/lib/constants";

const AnimatedMailCheckIcon = Animated.createAnimatedComponent(MailCheckIcon);

export default function EmailSent() {
  const colors = NAV_THEME.light;

  return (
    <View className="flex-1 items-center gap-2 px-8 py-52">
      <AnimatedMailCheckIcon
        size={102}
        entering={ZoomIn.duration(300)}
        color={colors.primary}
      />
      <Text className="text-2xl font-bold">Verify Your Email</Text>
      <Text className="text-center text-base text-muted-foreground">
        Check your email app, we sent you an email click on confirm email button
        to verify the email.
      </Text>
    </View>
  );
}
