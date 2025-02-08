import { isUndefined } from "lodash";

import { api } from "~/trpc/server";
import {
  AddressCard,
  AddressCardBaseProps,
  AddressDataCard,
} from "./add-address-form";

export const AddressDataServerComponent = async ({
  description,
  title,
  type,
}: AddressCardBaseProps) => {
  const address = await api.address.getByUser({ type });

  if (isUndefined(address))
    return <AddressCard {...{ description, title, type }} />;
  return <AddressDataCard initialData={address} />;
};
