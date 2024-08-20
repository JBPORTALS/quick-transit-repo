import { RefreshControl, ScrollView, View } from "react-native";
import * as Linking from "expo-linking";
import { Stack, useLocalSearchParams } from "expo-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { H4, Muted, P } from "~/components/ui/typography";
import VerifyPakcage from "~/components/VerifyPakcage";
import { Bike } from "~/lib/icons/Bike";
import { HandCoins } from "~/lib/icons/HandCoins";
import { IndianRupee } from "~/lib/icons/IndianRupee";
import { PackageCheck } from "~/lib/icons/PackageCheck";
import { PackageIcon } from "~/lib/icons/PackageIcon";
import { PhoneCall } from "~/lib/icons/PhoneCall";
import { QrCode } from "~/lib/icons/QrCode";
import { ActivityIndicator } from "~/lib/native/activity-indicator";
import { api } from "~/lib/trpc/api";

export default function PackageDetails() {
  const params = useLocalSearchParams<{ id: string }>();
  console.log(params);
  const { data, isLoading, isFetching, refetch } =
    api.packages.getById.useQuery(
      {
        id: params.id,
        isAdmin: true,
      },
      {
        enabled: !!params.id,
      },
    );

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <Stack.Screen options={{ title: "Package Details" }} />
        <ActivityIndicator size={42} className="text-primary" />
      </View>
    );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          style={{
            backgroundColor: "red",
          }}
          refreshing={isFetching}
          onRefresh={refetch}
        />
      }
    >
      <Stack.Screen options={{ title: "Package Details" }} />
      <View className="gap-3 p-5">
        <AspectRatio
          ratio={16 / 9}
          className="min-h-lvh items-center justify-center rounded-md border border-border bg-accent/30"
        >
          <PackageIcon
            size={96}
            strokeWidth={0.75}
            className="text-muted-foreground/50"
          />
        </AspectRatio>

        {/* Content of package */}
        <View className="gap-1">
          <Muted className="text-sm text-muted-foreground">
            #{data?.request.tracking_number}
          </Muted>
          <H4>{data?.title}</H4>
          <Muted>{data?.description}</Muted>
          <View className="flex-row flex-wrap gap-2 py-3">
            <Badge variant={"secondary"}>
              <Text>
                {data?.height} x {data?.breadth} x {data?.width} cm in (H x B x
                W)
              </Text>
            </Badge>

            <Badge variant={"secondary"}>
              <Text>{data?.weight} kg</Text>
            </Badge>
            <Badge variant={"secondary"}>
              <Text>{data?.category.name}</Text>
            </Badge>
          </View>
        </View>

        {/* Steps to complete the request */}
        <Accordion
          type="single"
          disabled
          value={
            !!data?.request.is_verified &&
            !["delivered", "shipping"].includes(
              data?.request.current_status ?? "",
            )
              ? "payment"
              : ["delivered", "shipping"].includes(
                    data?.request.current_status ?? "",
                  )
                ? "deliver"
                : "pickup"
          }
          className="native:max-w-md w-full max-w-sm"
        >
          {/* Pick-Up the package */}
          <AccordionItem value="pickup">
            <AccordionTrigger isCompleted={!!data?.request.is_verified}>
              <View className="flex-row items-center gap-2">
                <AspectRatio
                  ratio={1 / 1}
                  className="size-12 items-center justify-center rounded-full bg-primary/10"
                >
                  <PackageCheck
                    size={24}
                    strokeWidth={1.25}
                    className="text-primary"
                  />
                </AspectRatio>

                <Text className="font-semibold">Pick-up & Verify Package</Text>
              </View>
            </AccordionTrigger>
            <AccordionContent className="gap-5">
              <Separator />
              <View className="gap-2">
                <Text className="text-lg">Customer</Text>
                <Card>
                  <CardHeader className="flex-row items-center gap-2 p-3">
                    <Avatar
                      style={{ height: 48, width: 48 }}
                      alt={data?.customer.name ?? "Customer Profile Pic"}
                    >
                      <AvatarImage src={data?.customer.picture ?? ""} />
                      <AvatarFallback>
                        <Text>{data?.customer.name?.charAt(0)}</Text>
                      </AvatarFallback>
                    </Avatar>
                    <View>
                      <CardTitle className="text-base">
                        {data?.customer.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        +91 {data?.pick_up_address?.phone}
                      </CardDescription>
                    </View>
                    <Button
                      onPress={() =>
                        Linking.openURL(`tel:${data?.pick_up_address?.phone}`)
                      }
                      className="ml-auto"
                      variant={"outline"}
                    >
                      <Text>Call</Text>
                      <PhoneCall
                        size={16}
                        strokeWidth={1.25}
                        className="text-primary"
                      />
                    </Button>
                  </CardHeader>
                </Card>
              </View>
              <View className="gap-2">
                <Text className="text-lg font-medium">Address</Text>
                <P className="text-muted-foreground">
                  {data?.pick_up_address?.street} -{" "}
                  {data?.pick_up_address?.pincode}
                </P>
              </View>
              <VerifyPakcage />
            </AccordionContent>
          </AccordionItem>

          {/*Complete the payment details */}
          <AccordionItem value="payment">
            <AccordionTrigger
              isCompleted={["delivered", "shipping"].includes(
                data?.request.current_status ?? "",
              )}
            >
              <View className="flex-row items-center gap-2">
                <AspectRatio
                  ratio={1 / 1}
                  className="size-12 items-center justify-center rounded-full bg-primary/10"
                >
                  <IndianRupee
                    size={24}
                    strokeWidth={1.25}
                    className="text-primary"
                  />
                </AspectRatio>

                <Text className="font-semibold">Payment</Text>
              </View>
            </AccordionTrigger>
            <AccordionContent className="gap-3">
              <Button size={"lg"} variant={"secondary"}>
                <HandCoins
                  size={24}
                  strokeWidth={1.25}
                  className="text-foreground"
                />
                <Text>On Cash</Text>
              </Button>
              <Separator decorative />
              <Button size={"lg"}>
                <QrCode
                  size={24}
                  strokeWidth={1.25}
                  className="text-primary-foreground"
                />
                <Text>Generate QR Code</Text>
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/*Deliver to the courier office and upload details */}
          <AccordionItem value="deliver">
            <AccordionTrigger
              isCompleted={data?.request.current_status === "delivered"}
            >
              <View className="flex-row items-center gap-2">
                <AspectRatio
                  ratio={1 / 1}
                  className="size-12 items-center justify-center rounded-full bg-primary/10"
                >
                  <Bike size={24} strokeWidth={1.25} className="text-primary" />
                </AspectRatio>
                <Text className="font-semibold">Deliver the package</Text>
              </View>
            </AccordionTrigger>
            <AccordionContent>
              <Text>
                In the world of React Native, universal components are
                components that work on both web and native platforms.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </View>
    </ScrollView>
  );
}
