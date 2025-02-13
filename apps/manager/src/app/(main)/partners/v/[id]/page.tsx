import { Separator } from "@qt/ui/seperator";

import { api } from "~/trpc/server";
import { PartnerDetails } from "./components/partner-details";

export default async function Page({ params }: { params: { id: string } }) {
  const partnerDetails = await api.auth.getUserById({ id: params.id });
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how partners will see details on there app.
        </p>
      </div>
      <Separator />
      <PartnerDetails initialData={partnerDetails} />
    </div>
  );
}
