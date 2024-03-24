import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";

import Button from "~/components/button";

export default function Home() {
  const { user } = useUser();
  const { width } = Dimensions.get("screen");
  return (
    <View style={{ width }} className="flex h-full gap-5 bg-white px-4 pt-5">
      <Text className="text-2xl font-bold">
        Good Evening, {`${user?.firstName} ${user?.lastName}`}
      </Text>

      <View className="flex flex-row justify-between">
        <View className="bg- flex items-center justify-center rounded-md border border-pink-300 bg-pink-100 p-7 shadow-md">
          <Text className="text-3xl font-bold">12</Text>
          <Text className="text-xl text-slate-600">Pick-up</Text>
        </View>

        <View className="bg- flex items-center justify-center rounded-md border border-orange-300 bg-orange-100 p-7 shadow-md">
          <Text className="text-3xl font-bold">2</Text>
          <Text className="text-xl text-slate-600">Shipping</Text>
        </View>

        <View className="bg- flex items-center justify-center rounded-md border border-green-300 bg-green-100 p-7 shadow-md">
          <Text className="text-3xl font-bold">3</Text>
          <Text className="text-xl text-slate-600">Dilivered</Text>
        </View>
      </View>

      <Text className="text-xl font-semibold">Today's Packages</Text>

      <FlashList
        className="w-full"
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
            <View className="flex w-full flex-row gap-3">
              <Image
                source={require("../../../../assets/box.png")}
                style={{ width: 60, height: 50, borderRadius: 4 }}
              />
              <View className="flex w-full justify-between">
                <Text className="w-full text-lg font-semibold">
                  {props.item.title.length >= 35
                    ? props.item.title.slice(0, 35).concat("...")
                    : props.item.title}
                </Text>
                <Text className="text-sm text-slate-500">
                  11:00AM - 12:00PM
                </Text>
              </View>
              <Button>View</Button>
            </View>
          );
        }}
      />
    </View>
  );
}
