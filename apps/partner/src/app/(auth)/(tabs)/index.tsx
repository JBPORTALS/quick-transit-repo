import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";
import { TruckIcon } from "lucide-react-native";

import PackageItem from "~/components/package-item";
import StatsCard from "~/components/stats-card";
import { useColorsTheme } from "~/utils/constants";

const data = [
  {
    title: "RJS Questions Paer Bundle A and B together",
    time: "11:00 AM - 12:00 PM",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "11:00 AM - 12:00 PM",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "11:00 AM - 12:00 PM",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "11:00 AM - 12:00 PM",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "11:00 AM - 12:00 PM",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123 dklfldjflkdjflkdjfkl",
    time: "12:00 PM - 1:00 PM",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "3:00 PM - 4:00 PM",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "4:00 PM - 5:00 PM",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "5:00 PM - 6:00 PM",
  },
];
export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const colors = useColorsTheme();

  return (
    <ScrollView className="h-full">
      <View className="flex h-full gap-5 p-4">
        <Text className="text-xl font-bold text-foreground">
          Good Evening, {`${user?.firstName} ${user?.lastName ?? ""}`}
        </Text>

        <View className="flex flex-row justify-between gap-2">
          <StatsCard stats={20} />
          <StatsCard variant={"shipping"} stats={4} />
          <StatsCard variant={"delivered"} stats={35} />
        </View>

        <Text className="text-xl font-semibold text-foreground">
          Today's Packages
        </Text>
        <View className="gap-2">
          {data.map((data, index) => (
            <PackageItem
              key={index}
              data={data}
              onPress={() => router.push(`/(auth)/(stacks)/${index}`)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
