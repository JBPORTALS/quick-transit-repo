import { api } from "~/trpc/server";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Page() {
  const data = await api.auth.getPartners();
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
