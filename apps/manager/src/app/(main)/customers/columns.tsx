"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

import { RouterOutputs } from "@qt/api";
import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export type Customer = Awaited<RouterOutputs["auth"]["getCustomers"][0]>;

export const columns: ColumnDef<Customer>[] = [
  {
    header: "Customer",
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
    accessorKey: "total_requests",
    header: () => <div className="px-4 text-center">Total Requests</div>,
    cell(props) {
      return (
        <div className="px-4 text-center">
          <Text styles={"h4"}>{props.row.original.total_requests}</Text>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="px-4 text-right">Joined On</div>,
    cell({ row }) {
      return (
        <div className="px-4 text-right text-muted-foreground">
          {moment(row.original.created_at).fromNow()}
        </div>
      );
    },
  },
];
