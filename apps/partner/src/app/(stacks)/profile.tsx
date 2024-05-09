import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useUser } from "@clerk/clerk-expo";
import { StarIcon } from "lucide-react-native";

import { ColorsTheme } from "~/utils/constants";

export default function Profile() {
  const colors = ColorsTheme();

  return (
    <ScrollView className="h-full w-full">
      <View className="h-full w-full gap-5 border-t border-border px-4 py-3">
        <View className="items-center gap-3">
          <Image
            source={{ uri: "https://github.com/shadcn.png" }}
            style={{
              height: 130,
              width: 130,
              borderRadius: 99999,
              borderColor: colors.border,
              borderWidth: 1,
            }}
          />
          <View className="items-center gap-2">
            <Text className="text-2xl font-semibold text-foreground">
              {""} {"Shadcn"}
            </Text>
            <Text className="text-muted-foreground">Pick-Up Partner</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 items-center gap-3 rounded-md border border-border bg-card p-5 shadow-sm">
                <Text className="text-lg text-card-foreground">
                  Average Ratings
                </Text>
                <Text className="text-2xl font-bold text-card-foreground">
                  4
                </Text>
                <View className="flex-row gap-2">
                  <StarIcon size={16} color="#FFD600" />
                  <StarIcon size={16} color="#FFD600" />
                  <StarIcon size={16} color="#FFD600" />
                  <StarIcon size={16} color="#FFD600" />
                  <StarIcon size={16} color="#DDDDDD" />
                </View>
              </View>

              <View className="flex-1 items-center gap-3 rounded-md border border-border bg-card p-5 shadow-sm">
                <Text className="text-lg text-card-foreground">
                  Packages Delivered
                </Text>
                <Text className="text-3xl font-bold text-card-foreground">
                  50
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text className="text-xl font-bold text-foreground">Reviews</Text>

        {Array(6)
          .fill(0)
          .map((_, index) => (
            <View
              key={index}
              className="gap-3 rounded-md border border-border bg-card p-3"
            >
              <View className="flex-row gap-3">
                <Image
                  source={
                    "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                  }
                  style={{ height: 52, width: 52, borderRadius: 9999 }}
                />
                <View className="gap-1">
                  <Text className="text-lg font-medium text-card-foreground">
                    Jevon Raynor
                  </Text>
                  <Text className="text-muted-foreground">A day ago</Text>
                </View>
                <View className="ml-auto flex-row gap-2">
                  <StarIcon size={16} color="#FFD600" />
                  <StarIcon size={16} color="#FFD600" />
                  <StarIcon size={16} color="#FFD600" />
                  <StarIcon size={16} color="#FFD600" />
                  <StarIcon size={16} color="#DDDDDD" />
                </View>
              </View>
              <Text className="text-lg text-card-foreground">
                Magna id sint irure in cillum esse nisi dolor laboris ullamco.
                Consectetur proident ...
              </Text>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}
