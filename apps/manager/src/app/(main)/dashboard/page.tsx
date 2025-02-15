import { VStack } from "@qt/ui/stack";

import { api } from "~/trpc/server";
import PackagesChart from "./components/packages-chart";

export default async function page() {
  const packagesChartData = await api.packages.getAllCountByDate();
  return (
    <VStack className="col-span-4 w-full gap-5">
      <PackagesChart initialData={packagesChartData} />
    </VStack>
  );
}
