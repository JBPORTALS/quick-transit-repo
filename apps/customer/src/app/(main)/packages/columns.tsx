"use client";

import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";

import { RouterOutputs } from "@qt/api";
import { Button } from "@qt/ui/button";
import { Package, PackageBody, PackageThumbneil } from "@qt/ui/package";
import { HStack } from "@qt/ui/stack";
import { StatusTag } from "@qt/ui/status-tag";
import { Text } from "@qt/ui/text";

export type Package = RouterOutputs["packages"]["getAll"]["items"][0];

export const columns: ColumnDef<Package>[] = [
  {
    accessorKey: "package",
    header: () => <div>Package</div>,
    cell({ row }) {
      const { title, id, height, width, breadth, weight } = row.original;
      return (
        <Link href={`/package-details/${id}`}>
          <Package>
            <PackageThumbneil className="flex items-center justify-center bg-accent/40">
              <h1 className="text-2xl">📦</h1>
            </PackageThumbneil>
            <PackageBody className="flex flex-col gap-1">
              <Text styles={"small"}>{title}</Text>
              <HStack>
                <Text styles={"details"} className="text-muted-foreground">
                  {height}x{breadth}x{width} • {weight}
                </Text>
              </HStack>
            </PackageBody>
          </Package>
        </Link>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = row.original.bill.totalAmount;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="w-full text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "request.current_status",
    header: () => <div className="px-10 text-right">Status</div>,
    cell: ({ row }) => {
      const value = row.original;
      return (
        <div className="flex w-full justify-end">
          <HStack className="ml-auto items-center">
            <StatusTag status={value.request.current_status} />
          </HStack>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="px-5 text-right">Requested on</div>,
    cell({ row }) {
      return (
        <div className="w-full px-5 text-right">
          <span>{moment(row.original.created_at).fromNow()}</span>
        </div>
      );
    },
  },
];
