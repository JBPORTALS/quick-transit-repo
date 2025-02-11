import { api } from "~/trpc/server";
import { TrackingBar } from "./tracking-bar";

export default async function page({ params }: { params: { id: string } }) {
  const package_id = params.id;
  const initialData = await api.packages.getTrackingDetails({
    package_id,
  });

  if (!initialData) return <div>Unable to fetch tracking details</div>;

  return <TrackingBar initialData={initialData} />;
}
