import { View } from "react-native";
import { Tabs } from "expo-router";

import { ThemeToggle } from "~/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        headerBackgroundContainerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: isDarkColorScheme
            ? NAV_THEME.dark.border
            : NAV_THEME.light.border,
        },
        headerRight: () => {
          return (
            <View className="flex-row items-center gap-3 px-4">
              <View>
                <ThemeToggle />
              </View>
              <Avatar alt="profile pic" className="size-9 border">
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
  );
}
