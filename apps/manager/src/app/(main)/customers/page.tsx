import InputSearch from "~/app/_components/input-search";
import { CustomersDataTable } from "./data-table";

export default async function Page() {
  return (
    <div className="flex flex-col gap-5">
      <InputSearch />
      <CustomersDataTable />
    </div>
  );
}
