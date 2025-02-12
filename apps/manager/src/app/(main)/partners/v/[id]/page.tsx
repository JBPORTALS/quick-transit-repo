import { api } from "~/trpc/server";
import { PartnerDetails } from "./partner-details";

export default async function Page({ params }: { params: { id: string } }) {
  const partnerDetails = await api.auth.getUserById({ id: params.id });
  return <PartnerDetails initialData={partnerDetails} />;
}
