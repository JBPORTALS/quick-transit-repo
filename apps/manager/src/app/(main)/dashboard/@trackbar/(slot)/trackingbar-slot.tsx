"use client";

import { useState } from "react";
import { isUndefined } from "lodash";

import { Button } from "@qt/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@qt/ui/card";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";
import { UniversalTrackingBar } from "@qt/ui/universal-tracking-bar";

import AssignDialog from "~/app/_components/assign-dialog";
import { api } from "~/trpc/react";
import { TrackBarSkeleton } from "./skeleton";

export function TrackingBarSlot() {
  const [offset, setOffset] = useState(17);
  const { data, isLoading } = api.packages.getAllPackagesWithTracking.useQuery({
    offset,
  });

  if (isLoading) return <TrackBarSkeleton />;

  if (!isUndefined(data?.packageDetails)) {
    const { packageDetails, totalRecords } = data;
    return (
      <UniversalTrackingBar
        packageDetails={packageDetails}
        isPaginated
        totalPages={totalRecords}
        currentPage={offset + 1}
        onNext={() => setOffset((prev) => prev + 1)}
        onPrevious={() => setOffset((prev) => prev - 1)}
        assignPartnerComp={
          <AssignDialog packageId={packageDetails.id}>
            <Button variant={"outline"} className="w-full" size={"lg"}>
              Assign Parnter
            </Button>
          </AssignDialog>
        }
      />
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
              Assign partners to the packages and track the status of the
              packages over here.
            </Text>
          </VStack>
        </CardContent>
      </Card>
    );
}
