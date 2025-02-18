"use client";

import { useState } from "react";
import { isUndefined } from "lodash";

import { RouterOutputs } from "@qt/api";
import { Card, CardContent, CardHeader, CardTitle } from "@qt/ui/card";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";
import { UniversalTrackingBar } from "@qt/ui/universal-tracking-bar";

import { api } from "~/trpc/react";
import { TrackBarSkeleton } from "./skeleton";

export function TrackingBarClient({
  initialData,
}: {
  initialData: RouterOutputs["requests"]["getByStatusWithOffset"];
}) {
  const [offset, setOffset] = useState(0);
  const { data, isLoading } = api.requests.getByStatusWithOffset.useQuery(
    {
      offset,
      omitStatus: ["cancelled"],
      fetchByUserId: true,
    },
    {
      initialData: {
        packageDetails: initialData.packageDetails,
        totalRecords: initialData.totalRecords,
      },
    },
  );

  if (isLoading) return <TrackBarSkeleton />;

  if (!isUndefined(data.packageDetails)) {
    const { packageDetails, totalRecords } = data;
    return (
      <div className="sticky top-5 col-span-2 w-full">
        <UniversalTrackingBar
          packageDetails={packageDetails}
          isPaginated
          totalPages={totalRecords}
          currentPage={offset + 1}
          onNext={() => {
            if (offset !== totalRecords) {
              setOffset(offset + 1);
            }
          }}
          onPrevious={() => {
            if (offset !== 0) {
              setOffset(offset - 1);
            }
          }}
        />
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
