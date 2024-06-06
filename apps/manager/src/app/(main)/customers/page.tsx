import React from "react";

import { api } from "~/trpc/server";
import { columns, Customer } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Customer[]> {
  // Fetch data from your API here.
  return [];
}
export default async function Page() {
  const data = await getData();
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
