import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import PagerView from "react-native-pager-view";
import { Image } from "expo-image";
import {
  ChevronDown,
  ExpandIcon,
  PhoneCallIcon,
  UserCheck,
} from "lucide-react-native";

import { Accordion } from "~/components/accordion";
import Button from "~/components/button";
import { colors } from "~/utils/constants";

export default function Package() {
  return (
    <ScrollView className="flex-1  bg-secondary">
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

        <View className="flex-row justify-between gap-3 rounded-lg border border-border bg-background p-3">
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

        <Accordion>
          <Accordion.List>
            <Accordion.Header Icon={<UserCheck />} title="Pick-Up Dilivery" />
            <Accordion.Body>
              <Text className="text-lg font-medium">Pick-up Address</Text>
              <Text className="text-lg">
                #678, Magadi Road, Chintamani, Banglore 512 076
              </Text>
              <View className="relative overflow-hidden rounded-xl border border-border">
                <MapView
                  initialRegion={{
                    latitude: 12,
                    latitudeDelta: 12,
                    longitude: 25,
                    longitudeDelta: 21,
                  }}
                  loadingEnabled
                  style={{ height: 250, borderRadius: 10 }}
                />
                <View className="absolute right-0 top-0 h-full w-full items-end bg-muted-foreground/30 p-3">
                  <ExpandIcon size={24} color={colors.background} />
                </View>
              </View>
            </Accordion.Body>
          </Accordion.List>

          <Accordion.List>
            <Accordion.Header Icon={<UserCheck />} title="Generate Invoice" />
            <Accordion.Body>
              <Text className="text-lg font-medium">Generate Invoice</Text>
            </Accordion.Body>
          </Accordion.List>

          <Accordion.List>
            <Accordion.Header Icon={<UserCheck />} title="Verify Payment" />
            <Accordion.Body>
              <Text className="text-lg font-medium">Verify Payment</Text>
            </Accordion.Body>
          </Accordion.List>

          <Accordion.List>
            <Accordion.Header
              Icon={<UserCheck />}
              title="Upload Delivered Package Details"
            />
            <Accordion.Body>
              <Text className="text-lg font-medium">
                Upload Delivered Package Details
              </Text>
            </Accordion.Body>
          </Accordion.List>

          <Accordion.List>
            <Accordion.Header Icon={<UserCheck />} title="Complete Request" />
            <Accordion.Body>
              <Text className="text-lg font-medium">Complete Request</Text>
            </Accordion.Body>
          </Accordion.List>
        </Accordion>
      </View>
    </ScrollView>
  );
}
