import { Suspense } from "react";

import { TrackBarSkeleton } from "./skeleton";
import { TrackingBarSlot } from "./trackingbar-slot";

export default function page() {
  return (
    <div className="sticky top-32 col-span-2 w-full">
      <Suspense fallback={<TrackBarSkeleton />}>
        <TrackingBarSlot />
      </Suspense>
    </div>
  );
}
