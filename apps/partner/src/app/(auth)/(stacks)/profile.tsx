import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { StarIcon, StarsIcon } from "lucide-react-native";

export default function Profile() {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <ScrollView className="h-full w-full bg-white">
      <View className="h-full w-full gap-5 border-t border-slate-300  px-4 py-3">
        <View className="items-center gap-3">
          <Image
            source={
              user?.imageUrl ??
              require("../../../../assets/Sample_User_Icon.png")
            }
            style={{
              height: 130,
              width: 130,
              borderRadius: 99999,
              borderColor: "#dddd",
              borderWidth: 1,
            }}
          />
          <View className="items-center gap-2">
            <Text className="text-2xl font-semibold">
              {user?.firstName} {user?.lastName ?? ""}
            </Text>
            <Text className="text-muted-foreground">Pick-Up Partner</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 items-center gap-3 rounded-md border border-slate-200 bg-primary/10 p-5">
                <Text className="text-lg">Average Ratings</Text>
                <Text className="text-2xl font-bold">4</Text>
                <View className="flex-row gap-2">
                  <StarIcon size={16} color="#FFD600" />
                  <StarIcon size={16} color="#FFD600" />
                  <StarIcon size={16} color="#FFD600" />
                  <StarIcon size={16} color="#FFD600" />
                  <StarIcon size={16} color="#DDDDDD" />
                </View>
              </View>

              <View className="flex-1 items-center gap-3 rounded-md border border-slate-200 bg-primary/10 p-5">
                <Text className="text-lg">Packages Delivered</Text>
                <Text className="text-3xl font-bold">50</Text>
              </View>
            </View>
          </View>
        </View>

        <Text className="text-xl font-bold">Reviews</Text>

        {Array(6)
          .fill(0)
          .map((_, index) => (
            <View
              key={index}
              className="gap-3 rounded-md border border-border/10 bg-white p-3 shadow-sm"
            >
              <View className="flex-row gap-3">
                <Image
                  source={
                    "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                  }
                  style={{ height: 52, width: 52, borderRadius: 9999 }}
                />
                <View className="gap-1">
                  <Text className="text-lg font-medium">Jevon Raynor</Text>
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
              <Text className="text-lg">
                Magna id sint irure in cillum esse nisi dolor laboris ullamco.
                Consectetur proident ...
              </Text>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}
