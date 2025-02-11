"use client";

import { useSearchParams } from "next/navigation";

import { RouterOutputs } from "@qt/api";

import { api } from "~/trpc/react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export function PartnersList({
  initialData,
}: {
  initialData: RouterOutputs["auth"]["getPartners"];
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { data } = api.auth.getPartners.useQuery({ query }, { initialData });
  return <DataTable columns={columns} data={data} />;
}
