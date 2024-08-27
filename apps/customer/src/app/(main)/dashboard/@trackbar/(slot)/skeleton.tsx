import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@qt/ui/card";
import { Skeleton } from "@qt/ui/skeleton";
import { HStack } from "@qt/ui/stack";
import {
  TrackingBar,
  TrackingBarContent,
  TrackingBarIndicator,
  TrackingBarItem,
} from "@qt/ui/tracking-bar";

export function TrackBarSkeleton() {
  return (
    <div className="sticky top-20 col-span-2 w-full">
      <Card className="h-fit max-h-full w-full shadow-none">
        <CardHeader>
          <HStack className="items-center justify-between">
            <CardTitle>Traking Details</CardTitle>
            <Skeleton className="h-8 w-[100px] rounded-full" />
          </HStack>
        </CardHeader>
        <CardContent>
          <TrackingBar>
            <TrackingBarItem>
              <TrackingBarIndicator />
              <TrackingBarContent>
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="h-2 w-20 rounded-full" />
              </TrackingBarContent>
            </TrackingBarItem>
            <TrackingBarItem>
              <TrackingBarIndicator />
              <TrackingBarContent>
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="h-2 w-20 rounded-full" />
              </TrackingBarContent>
            </TrackingBarItem>
            <TrackingBarItem>
              <TrackingBarIndicator />
              <TrackingBarContent>
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="h-2 w-20 rounded-full" />
              </TrackingBarContent>
            </TrackingBarItem>
            <TrackingBarItem>
              <TrackingBarIndicator />
              <TrackingBarContent>
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="h-2 w-20 rounded-full" />
              </TrackingBarContent>
            </TrackingBarItem>
            <TrackingBarItem>
              <TrackingBarIndicator />
              <TrackingBarContent>
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="h-2 w-60 rounded-full" />
                <Skeleton className="h-2 w-52 rounded-full" />
                <Skeleton className="h-2 w-40 rounded-full" />
              </TrackingBarContent>
            </TrackingBarItem>
          </TrackingBar>
        </CardContent>
      </Card>
    </div>
  );
}
