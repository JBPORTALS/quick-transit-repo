"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

import { RouterOutputs } from "@qt/api";
import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export type Customer = Awaited<RouterOutputs["auth"]["getCustomers"][0]>;

// total_requests: number;
// id: string;
// email: string | null;
// name: string | null;
// picture: string | null;
// created_at: Date;

export const columns: ColumnDef<Customer>[] = [
  {
    header: "Partner",
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
    cell(props) {
      return (
        <Text styles={"body_medium"} className="text-right">
          {props.row.original.total_requests}
        </Text>
      );
    },
  },
  {
    header: "Joined At",
    cell({ row }) {
      return <div>{moment(row.original.created_at).fromNow()}</div>;
    },
  },
];
