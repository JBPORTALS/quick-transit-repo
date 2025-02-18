import { api } from "~/trpc/server";
import { TrackingBarClient } from "./tracking-bar-client";

export default async function page() {
  const initialPackages = await api.requests.getByStatusWithOffset({
    offset: 0,
    omitStatus: ["cancelled"],
    fetchByUserId: true,
  });

  return <TrackingBarClient initialData={initialPackages} />;
}
