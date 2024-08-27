"use client";

import { isUndefined } from "lodash";
import { Star } from "lucide-react";
import moment from "moment";

import { RouterOutputs } from "@qt/api";
import { Button } from "@qt/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@qt/ui/card";
import { Separator } from "@qt/ui/seperator";
import { Text } from "@qt/ui/text";
import { UniversalTrackingBar } from "@qt/ui/universal-tracking-bar";

import AssignDialog from "~/app/_components/assign-dialog";
import { api } from "~/trpc/react";
import { TrackBarSkeleton } from "./skeleton";

export const dynamic = "force-dynamic";

function Reviews({
  trackingDetails,
}: {
  trackingDetails: Exclude<
    RouterOutputs["packages"]["getTrackingDetails"],
    undefined
  >;
}) {
  const { data: partnerReviewDetails } = api.reviews.getReviewsByType.useQuery(
    {
      request_id: trackingDetails.request.id,
      type: "partner",
    },
    { enabled: trackingDetails.request.current_status === "delivered" },
  );

  const { data: applicationReviewDetails } =
    api.reviews.getReviewsByType.useQuery(
      {
        request_id: trackingDetails.request.id,
        type: "application",
      },
      { enabled: trackingDetails.request.current_status === "delivered" },
    );
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
        <CardDescription>Given by the customer</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isUndefined(partnerReviewDetails) ? (
          <Card className="flex h-32 items-center justify-center shadow-none">
            <CardContent>
              <Text styles={"body"} className="text-muted-foreground">
                No Reviews for partner
              </Text>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-none">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-base">
                You rated pick-up partner
              </CardTitle>
              <CardDescription>
                <span className="flex w-fit items-center gap-2 rounded-sm border border-amber-600/50 bg-amber-500/15 px-2 py-1 text-sm">
                  <Star className="size-4 text-amber-500" />{" "}
                  {partnerReviewDetails.rating} Stars
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3">
              <p className="text-sm">{partnerReviewDetails.comment}</p>
            </CardContent>
            <CardFooter className="flex justify-end p-3">
              <span className="text-xs text-muted-foreground">
                {moment(partnerReviewDetails.review_date).fromNow()}
              </span>
            </CardFooter>
          </Card>
        )}
        <Separator />
        {isUndefined(applicationReviewDetails) ? (
          <Card className="flex h-32 items-center justify-center shadow-none">
            <CardContent>
              <Text styles={"body"} className="text-muted-foreground">
                No Reviews for company
              </Text>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-none">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-base">You rated company</CardTitle>
              <CardDescription>
                <span className="flex w-fit items-center gap-2 rounded-sm border border-amber-600/50 bg-amber-500/15 px-2 py-1 text-sm">
                  <Star className="size-4 text-amber-500" />{" "}
                  {applicationReviewDetails.rating} Stars
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3">
              <p className="text-sm">{applicationReviewDetails.comment}</p>
            </CardContent>
            <CardFooter className="flex justify-end p-3">
              <span className="text-xs text-muted-foreground">
                {moment(applicationReviewDetails.review_date).fromNow()}
              </span>
            </CardFooter>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

export default function page({ params }: { params: { id: string } }) {
  const package_id = params.id;
  const { data: trackingDetails, isLoading } =
    api.packages.getTrackingDetails.useQuery({ package_id });

  if (isLoading || !trackingDetails) return <TrackBarSkeleton />;
  return (
    <div className="sticky top-20 col-span-3 flex w-full flex-col gap-3">
      <UniversalTrackingBar
        packageDetails={trackingDetails}
        assignPartnerComp={
          <AssignDialog packageId={package_id}>
            <Button variant={"outline"} className="w-full" size={"lg"}>
              Assign Parnter
            </Button>
          </AssignDialog>
        }
      />
      {trackingDetails.request.current_status === "delivered" && (
        <Reviews trackingDetails={trackingDetails} />
      )}
    </div>
  );
}
