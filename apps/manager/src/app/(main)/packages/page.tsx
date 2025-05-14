import InputSearch from "~/app/_components/input-search";
import { PackagesDataTable } from "./dataTable";

export default async function Page() {
  return (
    <div className="flex flex-col gap-5">
      <InputSearch />
      <PackagesDataTable />
    </div>
  );
}
