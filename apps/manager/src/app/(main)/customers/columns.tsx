"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export type Customer = {
  id: string;
  name: string;
  email: string;
  total_requests: number;
  pending: number;
  delivered: number;
  created_at: string;
};

export const columns: ColumnDef<Customer>[] = [
  {
    header: "Custoemr",
    cell(props) {
      return (
        <HStack className="items-center">
          <Avatar className="size-10">
            <AvatarImage />
            <AvatarFallback>{props.row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <VStack className="gap-0">
            <Text styles={"subtle_medium"}>{props.row.original.name}</Text>
            <Text styles={"subtle"}>{props.row.original.email}</Text>
          </VStack>
        </HStack>
      );
    },
  },
  {
    header: "Total Requests",
    accessorKey: "total_requests",
  },
  {
    header: "Pending Requests",
    accessorKey: "pending",
  },
  {
    header: "Delivered Requests",
    accessorKey: "delivered",
  },
  {
    header: "Joined At",
    cell({ row }) {
      return <div>{moment(row.original.created_at).fromNow()}</div>;
    },
  },
];
