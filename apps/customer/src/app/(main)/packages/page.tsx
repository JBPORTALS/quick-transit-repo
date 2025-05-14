import InputSearch from "~/app/_components/input-search";
import { PackagesDataTable } from "./data-table";

export default async function DemoPage() {
  return (
    <div className="flex flex-col gap-5">
      <InputSearch />
      <PackagesDataTable />
    </div>
  );
}
