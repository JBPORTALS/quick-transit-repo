import type { SearchParams } from "nuqs";
import React from "react";

import { api } from "~/trpc/server";
import { loadSearchParams } from "~/utils/search-params";
import { PackagesList } from "./packages-list";

export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q } = await loadSearchParams(searchParams);
  const data = await api.packages.getByCustomerId({ query: q });

  return <PackagesList initialData={data} />;
}
