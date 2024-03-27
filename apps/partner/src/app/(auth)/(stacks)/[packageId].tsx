import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Image } from "expo-image";
import { ChevronDown, PhoneCallIcon, UserCheck } from "lucide-react-native";

import Button from "~/components/button";
import { colors } from "~/utils/constants";

export default function Package() {
  return (
    <ScrollView className="flex-1  bg-background">
      <View className="h-fulll flex-1 gap-3 border-t border-border px-4 py-3">
        <View
          style={{
            height: 240,
            borderRadius: 10,
            overflow: "hidden",
            width: "auto",
          }}
        >
          <PagerView
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 6,
              }}
              key="1"
            >
              <Image
                source={require("assets/box.png")}
                style={{ height: 240, width: 360 }}
                priority={"high"}
                transition={200}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 6,
              }}
              key="2"
            >
              <Image
                source={require("assets/box.png")}
                style={{ height: 240, width: 360 }}
                priority={"high"}
                transition={200}
              />
            </View>
          </PagerView>
        </View>

        <Text className="text-sm text-muted-foreground">
          #27872872878278838
        </Text>

        <Text className="text-lg font-semibold text-foreground">
          RJS Question paper (Bundle A)
        </Text>

        <Text className="items-center justify-center text-lg text-foreground">
          Amount Charged -{" "}
          <Text className="text-2xl font-bold text-foreground">₹800</Text>
        </Text>

        <View className="flex-row justify-between gap-3 rounded-md py-2">
          <View className="flex-row gap-3">
            <Image
              source={
                "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              }
              style={{ height: 52, width: 52, borderRadius: 9999 }}
            />
            <View className="gap-1">
              <Text className="text-lg font-medium">IG Institutes</Text>
              <Text className="text-muted-foreground">73837373737</Text>
            </View>
          </View>
          <Button
            size={"sm"}
            variant={"ghost"}
            rightIcon={<PhoneCallIcon size={16} color={colors.foreground} />}
          >
            Call
          </Button>
        </View>

        <View className="my-3 h-[0.5px] bg-muted" />

        {/* Accordion */}
        <View>
          {/* Accordion Header */}
          <View className="w-full flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-14 w-14 items-center justify-center rounded-full border border-primary bg-primary/20 p-3">
                <UserCheck size={24} color={colors.primary} />
              </View>
              <Text className="font-medium">Pick-up Package</Text>
            </View>
            <TouchableOpacity className="rounded-full border border-accent-foreground bg-accent p-1">
              <ChevronDown size={24} color={colors.accentForeground} />
            </TouchableOpacity>
          </View>

          {/* Accordion Body */}
          <View className="pl-6">
            <View className="border-l border-primary/30 py-2 pl-10">
              <Text className="text-lg font-medium">Pick-up Address</Text>
              <Text className="text-lg">
                #678, Magadi Road, Chintamani, Banglore 512 076
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
