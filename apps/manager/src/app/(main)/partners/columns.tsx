"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { User2Icon } from "lucide-react";
import moment from "moment";

import { RouterOutputs } from "@qt/api";
import { cn } from "@qt/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { buttonVariants } from "@qt/ui/button";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export type Customer = Awaited<
  RouterOutputs["auth"]["getPartners"]["items"][0]
>;

export const columns: ColumnDef<Customer>[] = [
  {
    header: "Partner",
    cell(props) {
      const original = props.row.original;
      return (
        <Link href={`/partners/v/${original.id}/`}>
          <HStack
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-fit w-full justify-start",
            )}
          >
            <Avatar className="size-12 overflow-hidden border border-primary/50 [&_svg]:size-full">
              <AvatarImage src={props.row.original.picture ?? undefined} />
              <AvatarFallback className="overflow-hidden bg-primary/20">
                <User2Icon className="mt-3 fill-primary text-transparent" />
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
        </Link>
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
