"use client";

import { useSearchParams } from "next/navigation";

import { DataTable } from "~/app/_components/datatable";
import { SpinnerPage } from "~/app/_components/spinner-page";
import { api } from "~/trpc/react";
import { columns } from "./columns";

export function PackagesDataTable() {
  const searchParams = useSearchParams();
  const pageIndex = searchParams.get("pageIndex") ?? "0";
  const pageSize = searchParams.get("pageSize") ?? "10";
  const query = searchParams.get("q") ?? "";

  const { data, isLoading } = api.packages.getAll.useQuery({
    pageSize: parseInt(pageSize),
    pageIndex: parseInt(pageIndex),
    query,
  });

  if (isLoading) return <SpinnerPage />;

  return (
    <DataTable
      data={data?.items ?? []}
      pageCount={data?.pageCount}
      columns={columns}
    />
  );
}
