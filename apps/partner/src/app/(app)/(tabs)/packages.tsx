import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Settings2Icon } from "lucide-react-native";

import PackageItem from "~/components/package-item";
import { ColorsTheme } from "~/utils/constants";

const data = [
  {
    title: "RJS Questions Paer Bundle A and B together",
    time: "Today",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "A day ago",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "2 days ago",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "2 days ago",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "2 days ago",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123 dklfldjflkdjflkdjfkl",
    time: "3 days ago",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "4 days ago",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "4 days ago",
  },
  {
    title: "DSIT Questions Paper Box A 15CS123",
    time: "5 days ago",
  },
];

export default function Packages() {
  const colors = ColorsTheme();
  const router = useRouter();
  return (
    <ScrollView className="h-full gap-3 p-4">
      <View className="flex-row justify-between py-2">
        <Text className="text-xl font-medium text-foreground">
          Packages History
        </Text>
        <Settings2Icon size={24} color={colors.foreground} />
      </View>
      <View className="gap-2 py-8">
        {data.map((data, index) => (
          <PackageItem
            key={index}
            data={data}
            onPress={() =>
              router.navigate({
                pathname: "/package/[packageId]",
                params: {
                  packageId: index,
                },
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}
