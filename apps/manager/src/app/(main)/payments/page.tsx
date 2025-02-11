import React from "react";

import { api } from "~/trpc/server";
import { columns, Customer } from "./columns";
import { DataTable } from "./data-table";

export default async function Page() {
  const data = await api.auth.getCustomers();
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
