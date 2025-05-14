import React from "react";

import { Separator } from "@qt/ui/seperator";

import { api } from "~/trpc/server";
import PackageDetails from "../components/package-details";

export default async function Page({ params }: { params: { id: string } }) {
  const packages = await api.packages.getByPartnerId({ id: params.id });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Assigned Packages</h3>
        <p className="text-sm text-muted-foreground">
          All assigned packages to this partner
        </p>
      </div>
      <Separator />
      <PackageDetails initialData={packages} />
    </div>
  );
}
