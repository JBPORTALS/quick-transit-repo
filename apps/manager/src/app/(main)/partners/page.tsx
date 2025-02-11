import { SearchParams } from "nuqs";

import { api } from "~/trpc/server";
import { loadSearchParams } from "~/utils/search-params";
import { PartnersList } from "./partners-list";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q } = await loadSearchParams(searchParams);
  const data = await api.auth.getPartners({ query: q });
  return (
    <div>
      <PartnersList initialData={data} />
    </div>
  );
}
