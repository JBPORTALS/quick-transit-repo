import { View } from "react-native";
import { Image } from "expo-image";

import { ThemeToggle } from "~/components/ThemeToggle";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function IndexScreen() {
  return (
    <View className="flex-1 items-center justify-between px-4 py-10">
      <View className="size-10">
        <ThemeToggle />
      </View>
      <View className="flex-1 items-center justify-end gap-1 ">
        <Image
          source={require("assets/images/qt-logo.png")}
          style={{ height: 52, width: 52 }}
        />
        <Text className="font-GeistBlack text-3xl ">Quick Transitt</Text>
        <Text className="font-GeistBlack mb-20 text-xl text-muted-foreground">
          Partner App
        </Text>
        <Image
          source={require("assets/images/truck.png")}
          style={{ width: 400, height: 250 }}
          contentFit="contain"
          transition={1000}
        />
        <Text className="px-5 pb-10 text-center text-lg text-muted-foreground">
          {
            '"Effortlessly pick, deliver, and track packages to their destination."'
          }
        </Text>
      </View>
      <View className="w-full gap-5">
        <Button size={"lg"} variant={"outline"} className="w-full">
          <Text>Sign In</Text>
        </Button>
        <Button size={"lg"} className="w-full">
          <Text>Get Started</Text>
        </Button>
      </View>
    </View>
  );
}
