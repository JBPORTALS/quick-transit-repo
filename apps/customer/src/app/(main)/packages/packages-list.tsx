"use client";

import { useSearchParams } from "next/navigation";

import { RouterOutputs } from "@qt/api";

import { api } from "~/trpc/react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

export function PackagesList({
  initialData,
}: {
  initialData: RouterOutputs["packages"]["getByCustomerId"];
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { data } = api.packages.getByCustomerId.useQuery(
    { query },
    { initialData },
  );
  return <DataTable columns={columns} data={data} />;
}
