import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ThemeToggle } from "~/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={
          isDarkColorScheme ? NAV_THEME.dark.card : NAV_THEME.light.card
        }
      />
      <Tabs
        screenOptions={{
          headerRight: () => {
            return (
              <View className="flex-row items-center gap-3 px-4">
                <View>
                  <ThemeToggle />
                </View>
                <Avatar alt="profile pic" className=" border border-primary">
                  <AvatarImage
                    source={{ uri: "https://github.com/shadcn.png" }}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </View>
            );
          },
        }}
      />
    </SafeAreaProvider>
  );
}
