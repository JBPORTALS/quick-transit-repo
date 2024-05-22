import { api } from "~/trpc/server";
import {
  AddressCard,
  AddressCardProps,
  AddressDataCard,
} from "./add-address-form";

export const AddressDataServerComponent = async ({
  description,
  title,
  type,
}: AddressCardProps) => {
  const address = await api.address.getAddressByUser({ type });

  if (address) return <AddressDataCard {...address} />;
  return <AddressCard {...{ description, title, type }} />;
};
