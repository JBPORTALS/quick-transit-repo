import React from "react";
import { formatDistance } from "date-fns";
import { FileDownIcon, TruckIcon } from "lucide-react";
import moment from "moment";

import { Button } from "@qt/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@qt/ui/card";
import { HStack } from "@qt/ui/stack";
import { Tag } from "@qt/ui/tag";
import { Text } from "@qt/ui/text";

import {
  TrackingBar,
  TrackingBarContent,
  TrackingBarIndicator,
  TrackingBarItem,
} from "~/app/_components/tracking-bar";
import { api } from "~/trpc/server";

export default async function page({ params }: { params: { id: string } }) {
  const package_id = params.id;
  const trackingDetails = await api.packages.getTrackingDetails({ package_id });
  return (
    <div className="sticky top-20 col-span-3 w-full">
      <Card className="max-h-fit min-h-fit w-full shadow-none">
        <CardHeader>
          <HStack className="items-center justify-between">
            <CardTitle>Traking Details</CardTitle>
            <Tag variant={"gray"} className="py-2">
              <TruckIcon className="h-5 w-5" />
              <Text styles={"body_medium"}>Picking Up</Text>
            </Tag>
          </HStack>
        </CardHeader>
        <CardContent>
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
                    <Text styles={"details"} className="text-muted-foreground">
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
                  isActive={trackingDetails?.current_status === "picking"}
                >
                  <TrackingBarIndicator />
                  <TrackingBarContent className="gap-0">
                    <Text styles={"subtle"}>Picked Up</Text>
                    {trackingDetails?.picking_at && (
                      <Text
                        styles={"details"}
                        className="text-muted-foreground"
                      >
                        {moment(trackingDetails.picking_at).fromNow()}
                      </Text>
                    )}
                  </TrackingBarContent>
                </TrackingBarItem>
                <TrackingBarItem
                  isActive={trackingDetails?.current_status === "shipping"}
                >
                  <TrackingBarIndicator />
                  <TrackingBarContent>
                    <Text styles={"subtle"}>Shipping</Text>
                  </TrackingBarContent>
                </TrackingBarItem>
                <TrackingBarItem
                  isActive={trackingDetails?.current_status === "delivered"}
                >
                  <TrackingBarIndicator />
                  <TrackingBarContent className="gap-1">
                    <Text styles={"subtle"}>Delivered</Text>
                    {trackingDetails?.delivered_at &&
                      trackingDetails.current_status === "delivered" && (
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
        </CardContent>
      </Card>
    </div>
    // <div className="sticky top-20 col-span-3 w-full">
    //   <Card className="h-fit max-h-full w-full shadow-none">
    //     <CardHeader>
    //       <HStack className="items-center justify-between">
    //         <CardTitle>Traking Details</CardTitle>
    //         <Skeleton className="h-8 w-[100px] rounded-full" />
    //       </HStack>
    //     </CardHeader>
    //     <CardContent>
    //       <TrackingBar>
    //         <TrackingBarItem>
    //           <TrackingBarIndicator />
    //           <TrackingBarContent>
    //             <Skeleton className="h-4 w-32 rounded-full" />
    //             <Skeleton className="h-2 w-20 rounded-full" />
    //           </TrackingBarContent>
    //         </TrackingBarItem>
    //         <TrackingBarItem>
    //           <TrackingBarIndicator />
    //           <TrackingBarContent>
    //             <Skeleton className="h-4 w-32 rounded-full" />
    //             <Skeleton className="h-2 w-20 rounded-full" />
    //           </TrackingBarContent>
    //         </TrackingBarItem>
    //         <TrackingBarItem>
    //           <TrackingBarIndicator />
    //           <TrackingBarContent>
    //             <Skeleton className="h-4 w-32 rounded-full" />
    //             <Skeleton className="h-2 w-20 rounded-full" />
    //           </TrackingBarContent>
    //         </TrackingBarItem>
    //         <TrackingBarItem>
    //           <TrackingBarIndicator />
    //           <TrackingBarContent>
    //             <Skeleton className="h-4 w-32 rounded-full" />
    //             <Skeleton className="h-2 w-20 rounded-full" />
    //           </TrackingBarContent>
    //         </TrackingBarItem>
    //         <TrackingBarItem>
    //           <TrackingBarIndicator />
    //           <TrackingBarContent>
    //             <Skeleton className="h-4 w-32 rounded-full" />
    //             <Skeleton className="h-2 w-60 rounded-full" />
    //             <Skeleton className="h-2 w-52 rounded-full" />
    //             <Skeleton className="h-2 w-40 rounded-full" />
    //           </TrackingBarContent>
    //         </TrackingBarItem>
    //       </TrackingBar>
    //     </CardContent>
    //   </Card>
    // </div>
  );
}
