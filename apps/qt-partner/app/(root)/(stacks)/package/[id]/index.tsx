import {
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import * as Linking from "expo-linking";
import { Stack, useLocalSearchParams } from "expo-router";
import { isUndefined } from "lodash";
import moment from "moment";

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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { H2, H3, H4, Lead, Muted, P } from "~/components/ui/typography";
import UploadTrackingDetails from "~/components/UploadTrackingDetials";
import VerifyPakcage from "~/components/VerifyPakcage";
import { Bike } from "~/lib/icons/Bike";
import { HandCoins } from "~/lib/icons/HandCoins";
import { IndianRupee } from "~/lib/icons/IndianRupee";
import { PackageCheck } from "~/lib/icons/PackageCheck";
import { PackageIcon } from "~/lib/icons/PackageIcon";
import { PhoneCall } from "~/lib/icons/PhoneCall";
import { Star } from "~/lib/icons/Star";
import { ActivityIndicator } from "~/lib/native/activity-indicator";
import { api } from "~/lib/trpc/api";

export default function PackageDetails() {
  const params = useLocalSearchParams<{ id: string }>();
  // console.log(params);
  const { data, isLoading, refetch } = api.packages.getById.useQuery(
    {
      id: params.id,
      isAdmin: true,
    },
    {
      enabled: !!params.id,
    },
  );

  const { data: reviewDetails } = api.reviews.getReviewsByType.useQuery(
    {
      type: "partner",
      request_id: data?.request.id ?? "",
    },
    {
      enabled: data?.request.current_status === "delivered",
    },
  );
  const { mutateAsync: updateRequest } = api.requests.update.useMutation();
  const utils = api.useUtils();
  const { isPending: isBillDetailsUpdating, mutate: updateBillDetails } =
    api.bills.update.useMutation({
      async onSuccess() {
        await updateRequest({
          current_status: "pickedup",
          picked_at: new Date(),
          request_id: data?.request.id!,
        });
        await refetch();
        await utils.invalidate();
      },
    });

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <Stack.Screen options={{ title: "Package Details" }} />
        <ActivityIndicator size={42} className="text-primary" />
      </View>
    );

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScrollView
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps
        refreshControl={
          <RefreshControl
            style={{
              backgroundColor: "red",
            }}
            refreshing={isLoading}
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
                  {data?.height} x {data?.breadth} x {data?.width} cm in (H x B
                  x W)
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

          {/* If request get cancelled */}
          {data?.request.current_status === "cancelled" ? (
            <View className="h-52 items-center justify-center rounded-md border border-border">
              <H4>Request has been cancelled</H4>
            </View>
          ) : (
            <>
              {/* Steps to complete the request */}
              <Accordion
                type="single"
                disabled
                value={
                  !!data?.request.is_verified &&
                  !["delivered", "pickedup"].includes(
                    data?.request.current_status ?? "",
                  )
                    ? "payment"
                    : ["delivered", "pickedup"].includes(
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
                        className="size-12 items-center justify-center rounded-full border border-border bg-muted/60"
                      >
                        <PackageCheck
                          size={24}
                          strokeWidth={1.25}
                          className="text-primary"
                        />
                      </AspectRatio>
                      <View>
                        <Text className="font-semibold">
                          Pick-up & Verify Package
                        </Text>
                        <Muted>
                          {data?.request.picked_at &&
                            moment(data.request.picked_at).fromNow()}
                        </Muted>
                      </View>
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
                              Linking.openURL(
                                `tel:${data?.pick_up_address?.phone}`,
                              )
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
                    isCompleted={["delivered", "pickedup"].includes(
                      data?.request.current_status ?? "",
                    )}
                  >
                    <View className="flex-row items-center gap-2">
                      <AspectRatio
                        ratio={1 / 1}
                        className="size-12 items-center justify-center rounded-full border border-border bg-muted/60"
                      >
                        <IndianRupee
                          size={24}
                          strokeWidth={1.25}
                          className="text-primary"
                        />
                      </AspectRatio>
                      <View>
                        <Text className="font-semibold">Payment</Text>
                        <Muted>
                          {data?.bill.paid_at &&
                            moment(data.bill.paid_at).fromNow()}
                        </Muted>
                      </View>
                    </View>
                  </AccordionTrigger>
                  <AccordionContent className="gap-3">
                    <View className="w-full items-center justify-between gap-3.5">
                      <Lead className="text-center">Total Amount</Lead>
                      <H2 className="w-full text-center">
                        {data?.bill.total.toLocaleString("en-IN", {
                          currency: "INR",
                          style: "currency",
                          maximumFractionDigits: 2,
                        })}
                      </H2>
                      <Button
                        onLongPress={(e) => {
                          updateBillDetails({
                            bill_id: data?.bill.id!,
                            paid_at: new Date(),
                          });
                        }}
                        size={"lg"}
                        variant={"default"}
                        isLoading={isBillDetailsUpdating}
                        className=" w-full active:scale-95 active:opacity-90"
                      >
                        <HandCoins
                          size={24}
                          strokeWidth={1.25}
                          className="text-primary-foreground"
                        />
                        <Text>On Cash</Text>
                      </Button>
                      <Muted className="text-center">
                        Long press to confirm the cash collected action
                      </Muted>
                    </View>
                  </AccordionContent>
                </AccordionItem>

                {/*Deliver to the courier office and upload details */}
                <AccordionItem
                  value={
                    data?.request.current_status === "delivered"
                      ? ""
                      : "deliver"
                  }
                >
                  <AccordionTrigger
                    isCompleted={data?.request.current_status === "delivered"}
                  >
                    <View className="flex-row items-center gap-2">
                      <AspectRatio
                        ratio={1 / 1}
                        className="size-12 items-center justify-center rounded-full border border-border bg-muted/60"
                      >
                        <Bike
                          size={24}
                          strokeWidth={1.25}
                          className="text-primary"
                        />
                      </AspectRatio>
                      <Text className="font-semibold">Deliver the package</Text>
                    </View>
                  </AccordionTrigger>
                  <AccordionContent>
                    <View className="gap-2">
                      <P className="text-muted-foreground">Drop off to</P>
                      <H3 className="text-lg font-medium">
                        {data?.courier.name}
                      </H3>
                      <Separator />
                      <UploadTrackingDetails />
                    </View>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {data?.request.current_status === "delivered" && (
                <View className="flex flex-col gap-2">
                  <H4>Reviews</H4>
                  {isUndefined(reviewDetails) ? (
                    <View className="h-32 w-full items-center justify-center rounded-md border border-dashed border-border">
                      <P className="text-muted-foreground">No Reviews</P>
                    </View>
                  ) : (
                    <Card>
                      <CardHeader className="gap-3">
                        <CardTitle className="text-base">
                          Customer rated your service
                        </CardTitle>
                        <CardDescription>
                          <View className="flex-row gap-2 rounded-sm border border-amber-600/50 bg-amber-500/20 px-1 py-0.5">
                            <Star size={18} className="text-amber-500" />
                            <Muted>{reviewDetails.rating} Stars</Muted>
                          </View>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-6 py-0">
                        <P>{reviewDetails.comment}</P>
                      </CardContent>
                      <CardFooter className="items-end pt-1">
                        <Muted>
                          {moment(reviewDetails.review_date).fromNow()}
                        </Muted>
                      </CardFooter>
                    </Card>
                  )}
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
