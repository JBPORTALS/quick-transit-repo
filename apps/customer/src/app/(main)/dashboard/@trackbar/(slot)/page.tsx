import { api } from "~/trpc/server";
import { TrackingBarClient } from "./tracking-bar-client";

export default async function page() {
  const initialPackages = await api.packages.getAllTrackingDetails({
    offset: 0,
  });

  return <TrackingBarClient initialData={initialPackages} />;
}
