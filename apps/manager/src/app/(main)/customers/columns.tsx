"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

import { user } from "@qt/db";
import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export type UserSelect = Omit<typeof user.$inferSelect, "role">;

export interface Customer extends UserSelect {
  total_requests: number;
  pending: number;
}

export const columns: ColumnDef<Customer>[] = [
  {
    header: "Custoemr",
    cell(props) {
      return (
        <HStack className="items-center">
          <Avatar className="size-12 border-2">
            <AvatarImage src={props.row.original.picture ?? undefined} />
            <AvatarFallback>
              {props.row.original.name
                ? props.row.original.name.charAt(0)
                : "C"}
            </AvatarFallback>
          </Avatar>
          <VStack className="gap-0">
            <Text styles={"subtle_medium"}>
              {props.row.original.name ?? "Customer"}
            </Text>
            <Text styles={"subtle"} className="text-accent-foreground/50">
              {props.row.original.email}
            </Text>
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