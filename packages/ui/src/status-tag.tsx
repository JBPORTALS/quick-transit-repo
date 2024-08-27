import {
  BikeIcon,
  BoxIcon,
  CircleArrowOutUpRightIcon,
  PackageCheckIcon,
  PackageXIcon,
} from "lucide-react";

import { GetColumnData, requests } from "@qt/db";
import { HStack } from "@qt/ui/stack";

type statusEnum = GetColumnData<typeof requests.current_status>;

export const StatusTag = ({ status }: { status: statusEnum }) => {
  switch (status) {
    case "requested":
      return (
        <HStack className="w-fit items-center gap-2 rounded-full bg-orange-600/30 px-4 py-2 text-sm text-orange-800 dark:text-orange-600">
          <BoxIcon className="size-5" /> Requested
        </HStack>
      );
    case "confirmed":
      return (
        <HStack className="w-fit items-center gap-2 rounded-full bg-indigo-600/30 px-4 py-2 text-sm text-indigo-800 dark:text-indigo-600">
          <BikeIcon className="size-5" />
          Picking Up
        </HStack>
      );
    case "cancelled":
      return (
        <HStack className="w-fit items-center gap-2 rounded-full bg-red-600/30 px-4 py-2 text-sm text-red-800 dark:text-red-600">
          <PackageXIcon className="size-5" />
          Cancelled
        </HStack>
      );
    case "delivered":
      return (
        <HStack className="w-fit items-center gap-2 rounded-full bg-green-600/30 px-4 py-2 text-sm text-green-800 dark:text-green-600">
          <PackageCheckIcon className="size-5" /> Delivered
        </HStack>
      );
    default:
      return (
        <HStack className="w-fit items-center gap-2 rounded-full bg-yellow-600/30 px-4 py-2 text-sm text-yellow-800 dark:text-yellow-600">
          <CircleArrowOutUpRightIcon className="size-5" />
          Shipping
        </HStack>
      );
  }
};
