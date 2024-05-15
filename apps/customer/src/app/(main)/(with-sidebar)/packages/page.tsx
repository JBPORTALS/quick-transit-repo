import React from "react";

import { api } from "~/trpc/server";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

async function getData() {
  // Fetch data from your API here.
  return api.packages.getRecentPackages();
}

export default async function DemoPage() {
  const data = await getData();

  return <DataTable columns={columns} data={data} />;
}
