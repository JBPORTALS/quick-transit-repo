import { SearchParams } from "nuqs";

import { api } from "~/trpc/server";
import { loadSearchParams } from "~/utils/search-params";
import PackagesList from "./packages-list";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q } = await loadSearchParams(searchParams);
  const packages = await api.packages.getAll({ query: q });

  return <PackagesList initialData={packages} />;
}
