import { SearchParams } from "nuqs";

import { api } from "~/trpc/server";
import { loadSearchParams } from "~/utils/search-params";
import { CustomerList } from "./customers-list";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q } = await loadSearchParams(searchParams);
  const customers = await api.auth.getCustomers({ query: q });
  return (
    <div>
      <CustomerList initialData={customers} />
    </div>
  );
}
