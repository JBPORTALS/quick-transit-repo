import { VStack } from "@qt/ui/stack";

import { api } from "~/trpc/server";
import RecentPackagesList from "./recent-packages-list";

export default async function page() {
  const data = await api.packages.getRecentPackages();
  return (
    <VStack className="col-span-4 w-full">
      <RecentPackagesList initialData={data} />
    </VStack>
  );
}
