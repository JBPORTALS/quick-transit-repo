import { Suspense } from "react";

import { api } from "~/trpc/server";
import { TrackBarSkeleton } from "./skeleton";
import { TrackingBarSlot } from "./trackingbar-slot";

export default async function page() {
  const trackingDetails = await api.requests.getByStatusWithOffset({
    offset: 0,
    omitStatus: ["cancelled", "delivered"],
  });
  return (
    <div className="sticky top-32 col-span-2 w-full">
      <Suspense fallback={<TrackBarSkeleton />}>
        <TrackingBarSlot initialData={trackingDetails} />
      </Suspense>
    </div>
  );
}
