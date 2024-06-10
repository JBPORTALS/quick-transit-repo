"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

import { RouterOutputs } from "@qt/api";
import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Package, PackageBody, PackageThumbneil } from "@qt/ui/package";
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
    header: "Request",
    cell(props) {
      return (
        <Package>
          <PackageThumbneil>
            <Image src={"/package-1.jpg"} fill alt="Package Thumbnail" />
          </PackageThumbneil>
          <PackageBody className="flex flex-col gap-1">
            <Text styles={"small"}>{"Package Title"}</Text>
            <HStack>
              <Text styles={"details"} className="text-muted-foreground">
                {12}x{23}x{12} • {2}
              </Text>
            </HStack>
          </PackageBody>
        </Package>
      );
    },
  },
  {
    header: "Amount",
    cell(props) {
      return (
        <Text styles={"body_medium"} className="text-right">
          2,000
        </Text>
      );
    },
  },
  {
    header: "Paid on",
    cell({ row }) {
      return <div>{moment(row.original.created_at).fromNow()}</div>;
    },
  },
];
