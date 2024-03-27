import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";

import { colors } from "~/utils/constants";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <View className="flex h-full gap-5 bg-background px-4 pt-5">
      <Text className="text-2xl font-bold">
        Good Evening, {`${user?.firstName} ${user?.lastName ?? ""}`}
      </Text>

      <View className="flex flex-row justify-between gap-1">
        <View className="flex flex-1 items-center justify-center rounded-md border-2 border-pink-300 bg-secondary p-7 shadow-md">
          <Text className="text-3xl font-bold text-secondary-foreground">
            12
          </Text>
          <Text className="text-lg text-muted-foreground">Pick-up</Text>
        </View>

        <View className="borde-2 flex items-center justify-center rounded-md border-2 border-orange-300 bg-secondary p-7 shadow-md">
          <Text className="text-3xl font-bold text-secondary-foreground">
            32
          </Text>
          <Text className="text-lg text-muted-foreground">Shipping</Text>
        </View>

        <View className="flex items-center justify-center rounded-md border-2 border-green-300 bg-secondary p-7 shadow-md">
          <Text className="text-3xl font-bold text-secondary-foreground">
            333
          </Text>
          <Text className="text-lg text-muted-foreground">Dilivered</Text>
        </View>
      </View>

      <Text className="text-xl font-semibold">Today's Packages</Text>

      <FlashList
        bounces={false}
        bouncesZoom={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        estimatedItemSize={40}
        contentContainerClassName="flex"
        contentInsetAdjustmentBehavior="scrollableAxes"
        ItemSeparatorComponent={() => <View className="h-5" />}
        data={[
          {
            title: "RJS Questions Paer Bundle A and B together",
          },
          {
            title: "DSIT Questions Paper Box A 15CS123",
          },
          {
            title: "DSIT Questions Paper Box A 15CS123",
          },
          {
            title: "DSIT Questions Paper Box A 15CS123",
          },
          {
            title: "DSIT Questions Paper Box A 15CS123",
          },
          {
            title: "DSIT Questions Paper Box A 15CS123 dklfldjflkdjflkdjfkl",
          },
          {
            title: "DSIT Questions Paper Box A 15CS123",
          },
          {
            title: "DSIT Questions Paper Box A 15CS123",
          },
          {
            title: "DSIT Questions Paper Box A 15CS123",
          },
        ]}
        renderItem={(props) => {
          return (
            <TouchableOpacity
              onPress={() => router.push(`/(auth)/(stacks)/${props.index}`)}
              className="flex w-full flex-row gap-3"
            >
              <Image
                source={require("../../../../assets/box.png")}
                style={{
                  width: 60,
                  height: 50,
                  borderRadius: 4,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              />
              <View className="flex w-full justify-between">
                <Text className="w-full text-lg">
                  {props.item.title.length >= 35
                    ? props.item.title.slice(0, 35).concat("...")
                    : props.item.title}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  11:00AM - 12:00PM
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
