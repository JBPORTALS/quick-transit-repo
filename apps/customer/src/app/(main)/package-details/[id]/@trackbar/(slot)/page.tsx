"use client";

import React from "react";
import { BikeIcon, FileDownIcon, StarIcon } from "lucide-react";
import moment from "moment";

import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Button } from "@qt/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@qt/ui/card";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { StatusTag } from "~/app/_components/status-tag";
import {
  TrackingBar,
  TrackingBarContent,
  TrackingBarIndicator,
  TrackingBarItem,
} from "~/app/_components/tracking-bar";
import { api } from "~/trpc/react";
import { TrackBarSkeleton } from "./skeleton";

export const dynamic = "force-dynamic";

export default function page({ params }: { params: { id: string } }) {
  const package_id = params.id;
  const { data: trackingDetails, isLoading } =
    api.packages.getTrackingDetails.useQuery({ package_id });

  if (isLoading || !trackingDetails) return <TrackBarSkeleton />;

  return (
    <div className="sticky top-20 col-span-3 w-full">
      <Card className="max-h-fit min-h-fit w-full shadow-none">
        <CardHeader>
          <HStack className="items-center justify-between">
            <CardTitle>Traking Details</CardTitle>
            <StatusTag status={trackingDetails.current_status} />
          </HStack>
        </CardHeader>
        <CardContent>
          <VStack>
            <TrackingBar>
              <TrackingBarItem
                isActive={trackingDetails?.current_status === "requested"}
              >
                <TrackingBarIndicator icon="circle-check" />
                <TrackingBarContent className="gap-0">
                  <Text styles={"subtle"}>Requested</Text>
                  {trackingDetails?.requested_at && (
                    <Text styles={"details"} className="text-muted-foreground">
                      {moment(trackingDetails.requested_at).fromNow()}
                    </Text>
                  )}
                </TrackingBarContent>
              </TrackingBarItem>
              {trackingDetails?.current_status === "cancelled" ? (
                <TrackingBarItem
                  isActive={trackingDetails?.current_status === "cancelled"}
                >
                  <TrackingBarIndicator
                    icon="circle-x"
                    className="text-destructive"
                  />
                  <TrackingBarContent className="gap-0">
                    <Text styles={"subtle"}>Cancelled</Text>
                    {trackingDetails?.cacelled_at && (
                      <Text
                        styles={"details"}
                        className="text-muted-foreground"
                      >
                        {moment(trackingDetails.cacelled_at).fromNow()}
                      </Text>
                    )}
                  </TrackingBarContent>
                </TrackingBarItem>
              ) : (
                <>
                  <TrackingBarItem
                    isActive={trackingDetails?.current_status === "confirmed"}
                  >
                    <TrackingBarIndicator />
                    <TrackingBarContent className="gap-0">
                      <Text styles={"subtle"}>Confirmed</Text>
                      {trackingDetails?.confirmed_at && (
                        <Text
                          styles={"details"}
                          className="text-muted-foreground"
                        >
                          {moment(trackingDetails.confirmed_at).fromNow()}
                        </Text>
                      )}
                    </TrackingBarContent>
                  </TrackingBarItem>
                  <TrackingBarItem
                    isActive={trackingDetails?.current_status === "pickedup"}
                  >
                    <TrackingBarIndicator />
                    <TrackingBarContent className="gap-0">
                      <Text styles={"subtle"}>Picked Up</Text>
                      {trackingDetails?.picked_at && (
                        <Text
                          styles={"details"}
                          className="text-muted-foreground"
                        >
                          {moment(trackingDetails.picked_at).fromNow()}
                        </Text>
                      )}
                    </TrackingBarContent>
                  </TrackingBarItem>

                  <TrackingBarItem
                    isActive={trackingDetails?.current_status === "delivered"}
                  >
                    <TrackingBarIndicator />
                    <TrackingBarContent className="gap-1">
                      <Text styles={"subtle"}>Delivered</Text>
                      {trackingDetails.current_status === "delivered" &&
                        trackingDetails.delivered_at && (
                          <>
                            <Text
                              styles={"details"}
                              className="text-muted-foreground"
                            >
                              {moment(trackingDetails.delivered_at).fromNow()}
                            </Text>
                            <Text
                              styles={"details"}
                              className="text-muted-foreground"
                            >
                              Your package has beed delivered to franchise ✅
                            </Text>
                            <Text
                              styles={"details"}
                              className="text-muted-foreground"
                            >
                              Franchise Tracking ID:{" "}
                              {trackingDetails.franchise_tracking_id}
                            </Text>
                            <Button size={"sm"} variant={"outline"}>
                              <FileDownIcon className="size-4" /> Service Bill
                            </Button>
                          </>
                        )}
                    </TrackingBarContent>
                  </TrackingBarItem>
                </>
              )}
            </TrackingBar>
            {trackingDetails?.current_status != "requested" && (
              <HStack className="w-full items-center justify-between rounded-radius border p-3">
                <HStack>
                  <Avatar className="size-11 border">
                    <AvatarImage
                      src={trackingDetails.partner?.picture ?? undefined}
                    />
                    <AvatarFallback />
                  </Avatar>
                  <VStack className="gap-1">
                    <Text styles={"subtle_medium"}>
                      {trackingDetails.partner?.name}
                    </Text>
                    <HStack className="items-center gap-1">
                      <StarIcon className="size-3 text-muted-foreground" />
                      <Text
                        styles={"small"}
                        className="leading-none text-muted-foreground"
                      >
                        4.3 {"·"} Ratings
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
                <BikeIcon className="text-muted-foreground" />
              </HStack>
            )}
          </VStack>
        </CardContent>
      </Card>
    </div>
  );
}
