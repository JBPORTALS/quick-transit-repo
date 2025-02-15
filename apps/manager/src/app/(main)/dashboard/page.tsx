import { VStack } from "@qt/ui/stack";

import { api } from "~/trpc/server";
import PackagesChart from "./components/packages-chart";

// let INR = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "INR",
//   notation: "compact",
//   compactDisplay: "short",
//   maximumFractionDigits: 2,
// });

// let NumberFormat = new Intl.NumberFormat("en-US", {
//   notation: "compact",
//   compactDisplay: "short",
//   maximumFractionDigits: 1,
// });

// let INRWithoutNotation = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "INR",
//   maximumFractionDigits: 2,
// });

export default async function page() {
  const packagesChartData = await api.packages.getAllCountByDate();
  return (
    <VStack className="col-span-4 w-full gap-5">
      <PackagesChart initialData={packagesChartData} />
    </VStack>
  );
}
