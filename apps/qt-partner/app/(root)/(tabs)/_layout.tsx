import { View } from "react-native";
import { Tabs } from "expo-router";
import { BoxesIcon, HomeIcon } from "lucide-react-native";

import { ThemeToggle } from "~/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerRight: (props) => {
          return <ThemeToggle />;
        },
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 72,
        },
        tabBarActiveTintColor: isDarkColorScheme
          ? NAV_THEME.dark.text
          : NAV_THEME.light.primary,
        headerShadowVisible: false,
        headerStyle: {
          borderBottomWidth: 0.5,
        },
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle() {
            return (
              <Text
                className={cn(
                  "font-GeistBlack text-2xl tracking-wider",
                  isDarkColorScheme
                    ? "text-primary-foreground"
                    : "text-primary",
                )}
              >
                QT Partner
              </Text>
            );
          },
          tabBarIcon: (props) => (
            <HomeIcon
              size={props.size}
              strokeWidth={props.focused ? 1.25 : 1}
              color={props.color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="packages"
        options={{
          title: "Packages",
          tabBarIcon: (props) => (
            <BoxesIcon
              strokeWidth={props.focused ? 1.25 : 1}
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: (props) => (
            <View className="flex-row items-center gap-3 px-4">
              <Avatar
                alt="profile pic"
                style={{
                  width: 28,
                  height: 28,
                }}
                className={cn(
                  "border border-border",
                  props.focused &&
                    `border-2 ${isDarkColorScheme ? "border-primary-foreground" : "border-primary"}`,
                )}
              >
                <AvatarImage
                  source={{ uri: "session?.user.user_metadata.picture" }}
                />
                <AvatarFallback>
                  <Text>CN</Text>
                </AvatarFallback>
              </Avatar>
            </View>
          ),
          // tabBarBadge: "9+", // triggle the notification badge
        }}
      />
    </Tabs>
  );
}
