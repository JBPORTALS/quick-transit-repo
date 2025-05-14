"use client";

import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

import { RouterOutputs } from "@qt/api";
import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Package, PackageBody, PackageThumbneil } from "@qt/ui/package";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export type Customer = Awaited<
  RouterOutputs["bills"]["getAll"]["items"][number]
>;

export const columns: ColumnDef<Customer>[] = [
  {
    header: "Customer",
    cell(props) {
      return (
        <HStack className="items-center">
          <Avatar className="size-12 border-2">
            <AvatarImage
              src={props.row.original?.customer.picture ?? undefined}
            />
            <AvatarFallback>
              {props.row.original?.customer.name
                ? props.row.original?.customer.name.charAt(0)
                : "C"}
            </AvatarFallback>
          </Avatar>
          <VStack className="gap-0">
            <Text styles={"subtle_medium"}>
              {props.row.original?.customer.name ?? "Customer"}
            </Text>
            <Text styles={"subtle"} className="text-accent-foreground/50">
              {props.row.original?.customer.email}
            </Text>
          </VStack>
        </HStack>
      );
    },
  },
  {
    id: "package",
    header: "Package",
    cell(props) {
      const packageDetails = props.row.original.package_details;

      return (
        <Link href={`/package-details/${packageDetails.id}`}>
          <Package>
            <PackageThumbneil className="flex items-center justify-center bg-accent/40">
              <h1 className="text-2xl">📦</h1>
            </PackageThumbneil>
            <PackageBody className="flex flex-col gap-1">
              <Text styles={"small"}>{packageDetails?.title}</Text>
              <HStack>
                <Text styles={"details"} className="text-muted-foreground">
                  {packageDetails.breadth}x{packageDetails.width}x
                  {packageDetails.height} • {2}
                </Text>
              </HStack>
            </PackageBody>
          </Package>
        </Link>
      );
    },
  },
  {
    header: "Amount",
    cell(props) {
      const row = props.row.original;
      return (
        <Text styles={"body_medium"} className="text-right">
          {row.totalAmount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
          })}
        </Text>
      );
    },
  },
  {
    header: "Paid on",
    cell({ row }) {
      return <div>{moment(row.original.paid_at).fromNow()}</div>;
    },
  },
];
