import { isEmpty } from "lodash";

import { VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { DashboardEmptyState } from "~/app/_components/dashboard-empty-state";
import { api } from "~/trpc/server";

async function RecentPackagesList() {
  const data = await api.packages.getRecentPackages();

  if (isEmpty(data)) return <DashboardEmptyState />;
  else return <h1>Hello</h1>;
}

export default async function page() {
  return (
    <VStack className="col-span-4 w-full">
      <Text>Ongoing Packages</Text>
      <RecentPackagesList />
    </VStack>
  );
}
