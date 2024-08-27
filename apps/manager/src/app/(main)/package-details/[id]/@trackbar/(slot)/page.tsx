"use client";

import { Button } from "@qt/ui/button";
import { UniversalTrackingBar } from "@qt/ui/universal-tracking-bar";

import AssignDialog from "~/app/_components/assign-dialog";
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
    </div>
  );
}
