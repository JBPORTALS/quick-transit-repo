"use client";

import React, { useState } from "react";
import { isEmpty, isUndefined } from "lodash";
import {
  BikeIcon,
  ChevronLeft,
  ChevronRight,
  FileDownIcon,
  Package2Icon,
  StarIcon,
  TruckIcon,
} from "lucide-react";
import moment from "moment";

import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Button } from "@qt/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@qt/ui/card";
import { Separator } from "@qt/ui/seperator";
import { HStack, VStack } from "@qt/ui/stack";
import { Tag } from "@qt/ui/tag";
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

export default function page() {
  const [offset, setOffset] = useState(0);
  const [data, query] = api.packages.getAllTrackingDetails.useSuspenseQuery({
    offset,
  });

  if (query.isLoading) return <TrackBarSkeleton />;

  if (!isUndefined(data.packageDetails)) {
    const { packageDetails, totalRecords } = data;
    return (
      <div className="sticky top-5 col-span-2 w-full">
        <Card className="max-h-fit min-h-fit w-full shadow-none">
          <CardHeader>
            <HStack className="items-center justify-between">
              <CardTitle>Traking Details</CardTitle>
              <StatusTag status={packageDetails.request.current_status} />
            </HStack>
          </CardHeader>
          <CardContent>
            <VStack className="w-full">
              <HStack>
                <div className="rounded-radius border bg-accent p-3">
                  <Package2Icon className="text-accent-foreground/60" />
                </div>
                <VStack className="gap-1">
                  <Text styles={"subtle"}>{packageDetails.title}</Text>
                  <Text styles={"small"} className="text-muted-foreground">
                    Traking Number:{packageDetails.request.tracking_number}
                  </Text>
                </VStack>
              </HStack>

              <Separator />
              <TrackingBar>
                <TrackingBarItem
                  isActive={
                    packageDetails.request.current_status === "requested"
                  }
                >
                  <TrackingBarIndicator icon="circle-check" />
                  <TrackingBarContent className="gap-0">
                    <Text styles={"subtle"}>Requested</Text>
                    {packageDetails.request.requested_at && (
                      <Text
                        styles={"details"}
                        className="text-muted-foreground"
                      >
                        {moment(packageDetails.request.requested_at).fromNow()}
                      </Text>
                    )}
                  </TrackingBarContent>
                </TrackingBarItem>
                {packageDetails.request.current_status === "cancelled" ? (
                  <TrackingBarItem
                    isActive={
                      packageDetails.request.current_status === "cancelled"
                    }
                  >
                    <TrackingBarIndicator
                      icon="circle-x"
                      className="text-destructive"
                    />
                    <TrackingBarContent className="gap-0">
                      <Text styles={"subtle"}>Cancelled</Text>
                      {packageDetails.request?.cacelled_at && (
                        <Text
                          styles={"details"}
                          className="text-muted-foreground"
                        >
                          {moment(packageDetails.request.cacelled_at).fromNow()}
                        </Text>
                      )}
                    </TrackingBarContent>
                  </TrackingBarItem>
                ) : (
                  <>
                    <TrackingBarItem
                      isActive={
                        packageDetails.request?.current_status === "confirmed"
                      }
                    >
                      <TrackingBarIndicator />
                      <TrackingBarContent className="gap-0">
                        <Text styles={"subtle"}>Confirmed</Text>
                        {packageDetails.request?.confirmed_at && (
                          <Text
                            styles={"details"}
                            className="text-muted-foreground"
                          >
                            {moment(
                              packageDetails.request.confirmed_at,
                            ).fromNow()}
                          </Text>
                        )}
                      </TrackingBarContent>
                    </TrackingBarItem>
                    <TrackingBarItem
                      isActive={
                        packageDetails.request?.current_status === "picking"
                      }
                    >
                      <TrackingBarIndicator />
                      <TrackingBarContent className="gap-0">
                        <Text styles={"subtle"}>Picked Up</Text>
                        {packageDetails.request?.picking_at && (
                          <Text
                            styles={"details"}
                            className="text-muted-foreground"
                          >
                            {moment(
                              packageDetails.request.picking_at,
                            ).fromNow()}
                          </Text>
                        )}
                      </TrackingBarContent>
                    </TrackingBarItem>
                    <TrackingBarItem
                      isActive={
                        packageDetails.request?.current_status === "shipping"
                      }
                    >
                      <TrackingBarIndicator />
                      <TrackingBarContent>
                        <Text styles={"subtle"}>Shipping</Text>
                      </TrackingBarContent>
                    </TrackingBarItem>
                    <TrackingBarItem
                      isActive={
                        packageDetails.request?.current_status === "delivered"
                      }
                    >
                      <TrackingBarIndicator />
                      <TrackingBarContent className="gap-1">
                        <Text styles={"subtle"}>Delivered</Text>
                        {packageDetails.request?.delivered_at &&
                          packageDetails.request.current_status ===
                            "delivered" && (
                            <>
                              <Text
                                styles={"details"}
                                className="text-muted-foreground"
                              >
                                {moment(
                                  packageDetails.request.delivered_at,
                                ).fromNow()}
                              </Text>
                              <Text
                                styles={"details"}
                                className="text-muted-foreground"
                              >
                                Your packageDetails has beed delivered to
                                franchise ✅
                              </Text>
                              <Text
                                styles={"details"}
                                className="text-muted-foreground"
                              >
                                Franchise Tracking ID: #282282299223
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
              {packageDetails.request?.current_status != "requested" && (
                <HStack className="w-full items-center justify-between rounded-radius border p-3">
                  <HStack>
                    <Avatar className="size-11 border">
                      <AvatarImage
                        src={
                          packageDetails.request.partner?.picture ?? undefined
                        }
                      />
                      <AvatarFallback />
                    </Avatar>
                    <VStack className="gap-1">
                      <Text styles={"subtle_medium"}>
                        {packageDetails.request.partner?.name}
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
              <Separator />
              <HStack className="w-full items-center justify-between">
                <Button
                  onClick={() => setOffset((off) => off - 1)}
                  size={"icon"}
                  disabled={offset === 0}
                  variant={"outline"}
                >
                  <ChevronLeft />
                </Button>
                <Text styles={"subtle"} className="text-accent-foreground/80">
                  {offset + 1}/{totalRecords}
                </Text>
                <Button
                  size={"icon"}
                  disabled={offset === totalRecords - 1}
                  variant={"outline"}
                  onClick={() => setOffset((off) => off + 1)}
                >
                  <ChevronRight />
                </Button>
              </HStack>
            </VStack>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isUndefined(data?.packageDetails))
    return (
      <Card className="sticky top-5 col-span-2 h-[490px] w-full shadow-none">
        <CardHeader>
          <HStack className="items-center justify-between">
            <CardTitle>Traking Details</CardTitle>
          </HStack>
        </CardHeader>
        <CardContent className="h-full">
          <VStack className="h-full items-center justify-center gap-1 pb-20 ">
            <Text styles={"h4"}>No packages to track</Text>
            <Text
              styles={"small"}
              className="w-4/6 text-wrap text-center text-muted-foreground"
            >
              Add new package to track details here.
            </Text>
          </VStack>
        </CardContent>
      </Card>
    );
}
