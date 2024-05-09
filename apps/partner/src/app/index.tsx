import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";

import Button from "~/components/button";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-end gap-52 px-4 py-5">
      <View className="w-fit items-center  gap-3">
        <View className="h-fit w-fit flex-row items-center justify-center rounded-full border border-border px-4 py-2">
          <Image
            source={require("assets/qt-logo.svg")}
            style={{
              height: 32,
              width: 32,
            }}
          />
          <Text className="text-xl text-foreground">Quick Transitt</Text>
        </View>
        <Text className="text-center text-3xl text-foreground">
          Your Fast and Reliable Package Transfer Solution
        </Text>
        <Text className="text-center text-xl text-muted-foreground">
          Effortlessly manage package transportation between customers and
          transport agencies with our user-friendly app.
        </Text>
      </View>
      <View className="w-full gap-3 ">
        <Link asChild className="w-full" href={"/home"}>
          <Button className="w-full">Get Started</Button>
        </Link>
        <Button variant={"ghost"}>Signin</Button>
      </View>
    </View>
  );
}
