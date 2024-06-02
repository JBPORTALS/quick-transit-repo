import React from "react";

import { columns, Customer } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Customer[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Zack studios",
      email: "m@example.com",
      total_requests: 20,
      delivered: 18,
      pending: 2,
      created_at: new Date().toISOString(),
    },
    // ...
  ];
}
export default async function Page() {
  const data = await getData();
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
