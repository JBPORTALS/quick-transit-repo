import { ScrollView, Text, View } from "react-native";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import PagerView from "react-native-pager-view";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  BadgeIndianRupeeIcon,
  CameraIcon,
  CheckIcon,
  CloudUploadIcon,
  ExpandIcon,
  LucideScrollText,
  PackageCheckIcon,
  PhoneCallIcon,
  QrCodeIcon,
  ScrollTextIcon,
  TruckIcon,
  Wallet,
} from "lucide-react-native";

import { Accordion } from "~/components/accordion";
import Button from "~/components/button";
import Input from "~/components/input";
import StatusItem from "~/components/status-item";
import { ColorsTheme } from "~/utils/constants";

export default function Package() {
  const colors = ColorsTheme();
  const router = useRouter();
  return (
    <ScrollView className="flex-1">
      <View className="h-fulll flex-1 gap-4 border-t border-border p-4">
        <View
          style={{
            height: 240,
            borderRadius: 10,
            overflow: "hidden",
            width: "auto",
            borderWidth: 1,
            borderColor: colors.border,
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
                source={require("assets/package-1.jpg")}
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
                source={require("assets/package-2.jpg")}
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

        <Text className="text-lg text-foreground">
          RJS Question paper (Bundle A)
        </Text>

        <Text className="items-center justify-center text-base text-foreground">
          Total Charged -{" "}
          <Text className="text-xl font-bold text-foreground">₹800</Text>
        </Text>

        <StatusItem variant={"delivered"} />

        <View className="h-[1px] bg-border" />

        {/* Customer / Pick-Point Call Details : */}
        <View className="flex-row justify-between gap-3 rounded-lg border border-border bg-card p-3">
          <View className="flex-row gap-3">
            <Image
              source={
                "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              }
              style={{
                height: 52,
                width: 52,
                borderRadius: 9999,
                borderColor: colors.border,
                borderWidth: 1,
              }}
            />
            <View className="gap-1">
              <Text className="text-lg font-medium text-card-foreground">
                IG Institutes
              </Text>
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

        <View className="h-[1px] bg-border" />

        <Accordion>
          <Accordion.List>
            <Accordion.Header
              //done
              Icon={<TruckIcon size={24} color={colors.primary} />}
              title="Pick-Up The Package"
            />
            <Accordion.Body>
              <View className="h-fit gap-3">
                <Text className="text-lg font-medium text-card-foreground">
                  Pick-up Address
                </Text>
                <Text className="text-lg text-card-foreground">
                  #678, Magadi Road, Chintamani, Banglore 512 076
                </Text>
                <View className="relative overflow-hidden rounded-xl border border-border">
                  {/* <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                      latitude: 12,
                      latitudeDelta: 12,
                      longitude: 25,
                      longitudeDelta: 21,
                    }}
                    loadingEnabled
                    style={{ height: 250, borderRadius: 10 }}
                  /> */}
                  <View className="absolute right-0 top-0 h-full w-full items-end bg-muted-foreground/30 p-3">
                    <ExpandIcon size={24} color={colors.background} />
                  </View>
                </View>
                <Text className="text-lg font-medium text-card-foreground">
                  {"One Time Password (OTP)"}
                </Text>
                <Input
                  textAlign="center"
                  keyboardType="number-pad"
                  placeholder="--- ---"
                />
                <Text className="text-lg text-muted-foreground">
                  {"Ask customer about their package OTP"}
                </Text>
                <Button>Continue</Button>
              </View>
            </Accordion.Body>
          </Accordion.List>

          <Accordion.List>
            <Accordion.Header
              //done
              Icon={<ScrollTextIcon size={24} color={colors.primary} />}
              title="Generate Invoice"
            />
            <Accordion.Body>
              <View className="gap-3">
                <Text className="text-lg text-muted-foreground">
                  This action will generate invoice that will be submitted to
                  customer.
                </Text>
                <Button
                  onPress={() => router.push("/invoices/new")}
                  leftIcon={
                    <LucideScrollText
                      size={24}
                      color={colors.primaryForeground}
                    />
                  }
                >
                  Create Invoice
                </Button>
              </View>
            </Accordion.Body>
          </Accordion.List>

          {/* Verify Payment */}
          <Accordion.List>
            <Accordion.Header
              //done
              Icon={<BadgeIndianRupeeIcon size={24} color={colors.primary} />}
              title="Verify Payment"
            />
            <Accordion.Body>
              <View className="gap-3">
                <Text className="text-lg text-muted-foreground">
                  If online method Generate QR code to complete payment process.
                </Text>
                <Button
                  variant={"ghost"}
                  leftIcon={<QrCodeIcon size={24} color={colors.foreground} />}
                >
                  Generate
                </Button>
                <View className="h-[1px] bg-border" />
                <Button
                  leftIcon={
                    <Wallet size={24} color={colors.primaryForeground} />
                  }
                >
                  On Cash
                </Button>
              </View>
            </Accordion.Body>
          </Accordion.List>

          <Accordion.List>
            <Accordion.Header
              //done
              Icon={<CloudUploadIcon size={24} color={colors.primary} />}
              title="Upload Delivered Package Details"
            />
            <Accordion.Body>
              <View className="h-fit gap-3">
                <Text className="text-lg font-medium text-card-foreground">
                  Dilivery Address
                </Text>
                <Text className="text-lg text-card-foreground">
                  #678, Magadi Road, Chintamani, Banglore 512 076
                </Text>
                <View className="relative overflow-hidden rounded-xl border border-border">
                  {/* <MapView
                    initialRegion={{
                      latitude: 12,
                      latitudeDelta: 12,
                      longitude: 25,
                      longitudeDelta: 21,
                    }}
                    loadingEnabled
                    style={{ height: 250, borderRadius: 10 }}
                  /> */}
                  <View className="absolute right-0 top-0 h-full w-full items-end bg-muted-foreground/30 p-3">
                    <ExpandIcon size={24} color={colors.background} />
                  </View>
                </View>
                <Text className="text-lg font-medium text-card-foreground">
                  {"Package Tracking ID"}
                </Text>
                <Input
                  textAlign="center"
                  keyboardType="number-pad"
                  placeholder="--- ---"
                />

                <Button
                  onPress={() => router.push("/take-pic-reciept/camera")}
                  variant={"ghost"}
                  leftIcon={<CameraIcon size={24} color={colors.foreground} />}
                >
                  Take Pictures Of Reciept
                </Button>
                <View className="h-[1px] bg-border" />
                <Button>Submit</Button>
              </View>
            </Accordion.Body>
          </Accordion.List>

          <Accordion.List>
            <Accordion.Header
              //done
              Icon={<PackageCheckIcon size={24} color={colors.primary} />}
              title="Complete Request"
            />
            <Accordion.Body>
              <View className="gap-3">
                <Text className="text-lg text-muted-foreground">
                  One click away to complete this request 🎉
                </Text>
                <View className="h-[1px] bg-border" />
                <Button
                  rightIcon={
                    <CheckIcon size={24} color={colors.primaryForeground} />
                  }
                >
                  Done
                </Button>
              </View>
            </Accordion.Body>
          </Accordion.List>
        </Accordion>
      </View>
    </ScrollView>
  );
}
