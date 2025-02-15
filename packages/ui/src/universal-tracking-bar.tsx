import { isUndefined } from "lodash";
import {
  BikeIcon,
  ChevronLeft,
  ChevronRight,
  FileDownIcon,
  Package2Icon,
  StarIcon,
} from "lucide-react";
import moment from "moment";

import { RouterOutputs } from "@qt/api";
import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Button } from "@qt/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@qt/ui/card";
import { Separator } from "@qt/ui/seperator";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { StatusTag } from "./status-tag";
import {
  TrackingBar,
  TrackingBarContent,
  TrackingBarIndicator,
  TrackingBarItem,
} from "./tracking-bar";

type PackageDetails =
  RouterOutputs["requests"]["getByStatusWithOffset"]["packageDetails"];

interface UniversalTrackingBarProps {
  packageDetails: PackageDetails | PackageDetails[];
  isPaginated?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPrevious?: () => void;
  onNext?: () => void;
  assignPartnerComp?: React.ReactNode;
}

export function UniversalTrackingBar({
  packageDetails,
  isPaginated = false,
  currentPage = 1,
  totalPages = 1,
  assignPartnerComp,
  onPrevious,
  onNext,
}: UniversalTrackingBarProps) {
  const details = Array.isArray(packageDetails)
    ? packageDetails[0]
    : packageDetails;

  if (isUndefined(details)) {
    return (
      <Card className="col-span-2 h-[490px] w-full shadow-none">
        <CardHeader>
          <CardTitle>Tracking Details</CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          <VStack className="h-full items-center justify-center gap-1 pb-20">
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

  return (
    <div className={`${isPaginated ? "col-span-2" : "col-span-3"} w-full`}>
      <Card className="max-h-fit min-h-fit w-full shadow-none">
        <CardHeader>
          <HStack className="items-center justify-between">
            <CardTitle>Tracking Details</CardTitle>
            <StatusTag status={details.current_status} />
          </HStack>
        </CardHeader>
        <CardContent>
          <VStack className="w-full">
            {isPaginated && (
              <HStack>
                <div className="rounded-radius border bg-accent p-3">
                  <Package2Icon className="text-accent-foreground/60" />
                </div>
                <VStack className="gap-1">
                  <Text styles={"subtle"}>{details.package.title}</Text>
                  <Text styles={"small"} className="text-muted-foreground">
                    Tracking Number: {details.tracking_number}
                  </Text>
                </VStack>
              </HStack>
            )}

            {isPaginated && <Separator />}

            <TrackingBar>
              {/* TrackingBarItems */}
              <TrackingBarItem
                isActive={details.current_status === "requested"}
              >
                <TrackingBarIndicator icon="circle-check" />
                <TrackingBarContent className="gap-0">
                  <Text styles={"subtle"}>Requested</Text>
                  {details.requested_at && (
                    <Text styles={"details"} className="text-muted-foreground">
                      {moment(details.requested_at).fromNow()}
                    </Text>
                  )}
                </TrackingBarContent>
              </TrackingBarItem>
              {details.current_status === "cancelled" ? (
                <TrackingBarItem
                  isActive={details.current_status === "cancelled"}
                >
                  <TrackingBarIndicator
                    icon="circle-x"
                    className="text-destructive"
                  />
                  <TrackingBarContent className="gap-0">
                    <Text styles={"subtle"}>Cancelled</Text>
                    {details.cacelled_at && (
                      <Text
                        styles={"details"}
                        className="text-muted-foreground"
                      >
                        {moment(details.cacelled_at).fromNow()}
                      </Text>
                    )}
                  </TrackingBarContent>
                </TrackingBarItem>
              ) : (
                <>
                  <TrackingBarItem
                    isActive={details.current_status === "confirmed"}
                  >
                    <TrackingBarIndicator />
                    <TrackingBarContent className="gap-0">
                      <Text styles={"subtle"}>Confirmed</Text>
                      {details.confirmed_at && (
                        <Text
                          styles={"details"}
                          className="text-muted-foreground"
                        >
                          {moment(details.confirmed_at).fromNow()}
                        </Text>
                      )}
                    </TrackingBarContent>
                  </TrackingBarItem>
                  <TrackingBarItem
                    isActive={details.current_status === "pickedup"}
                  >
                    <TrackingBarIndicator />
                    <TrackingBarContent className="gap-0">
                      <Text styles={"subtle"}>Picked Up</Text>
                      {details.picked_at && (
                        <Text
                          styles={"details"}
                          className="text-muted-foreground"
                        >
                          {moment(details.picked_at).fromNow()}
                        </Text>
                      )}
                    </TrackingBarContent>
                  </TrackingBarItem>

                  <TrackingBarItem
                    isActive={details.current_status === "delivered"}
                  >
                    <TrackingBarIndicator />
                    <TrackingBarContent className="gap-1">
                      <Text styles={"subtle"}>Delivered</Text>
                      {details.current_status === "delivered" &&
                        details.delivered_at && (
                          <>
                            <Text
                              styles={"details"}
                              className="text-muted-foreground"
                            >
                              {moment(details.delivered_at).fromNow()}
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
                              {details.franchise_tracking_id}
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

            {!["delivered", "cancelled", "requested"].includes(
              details.current_status,
            ) && (
              <HStack className="w-full items-center justify-between rounded-radius border p-3">
                {/* Partner information */}
                <HStack>
                  <Avatar className="size-11 border">
                    <AvatarImage src={"/partner-pic.webp"} />
                    <AvatarFallback />
                  </Avatar>
                  <VStack className="gap-1">
                    <Text styles={"subtle_medium"}>
                      {details.partner?.name}
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

            {details.current_status === "requested" && assignPartnerComp}

            {isPaginated && (
              <>
                <Separator />
                <HStack className="w-full items-center justify-between">
                  <Button
                    onClick={onPrevious}
                    size={"icon"}
                    disabled={currentPage === 1}
                    variant={"outline"}
                  >
                    <ChevronLeft />
                  </Button>
                  <Text styles={"subtle"} className="text-accent-foreground/80">
                    {currentPage}/{totalPages}
                  </Text>
                  <Button
                    size={"icon"}
                    disabled={currentPage === totalPages}
                    variant={"outline"}
                    onClick={onNext}
                  >
                    <ChevronRight />
                  </Button>
                </HStack>
              </>
            )}
          </VStack>
        </CardContent>
      </Card>
    </div>
  );
}
