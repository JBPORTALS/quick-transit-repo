import { PlusIcon } from "lucide-react";

import { Button } from "@qt/ui/button";

import InputSearch from "~/app/_components/input-search";
import NewPartner from "~/app/_components/new-partner";
import { PartnersDataTable } from "./data-table";

export default async function Page() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <InputSearch />
        <NewPartner>
          <Button>
            Add <PlusIcon />
          </Button>
        </NewPartner>
      </div>
      <PartnersDataTable />
    </div>
  );
}
