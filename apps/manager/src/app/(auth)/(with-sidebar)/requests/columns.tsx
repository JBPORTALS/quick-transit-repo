"use client";

import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@qt/ui/button";
import { Package, PackageBody, PackageThumbneil } from "@qt/ui/package";
import { HStack } from "@qt/ui/stack";
import { Tag } from "@qt/ui/tag";
import { Text } from "@qt/ui/text";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "success" | "failed";
  email: string;
  name: string;
  dimension: string;
  weight: string;
  requestedon: string;
};

// Function to return JSX tag based on status
const getStatusTag = (status: Payment["status"]): JSX.Element => {
  switch (status) {
    case "pending":
      return <Tag variant="pending">Pending</Tag>;
    case "success":
      return <Tag variant="success">Success</Tag>;
    case "failed":
      return <Tag variant="error">Failed</Tag>;
    default:
      return <Tag variant="error">Unknown</Tag>;
  }
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "package",
    header: () => <div>Package</div>,
    cell({ row }) {
      const { name, dimension, weight, id } = row.original as Payment;
      return (
        <Link href={`/request-details/${id}`}>
          <Package>
            <PackageThumbneil>
              <Image src={"/package-1.jpg"} fill alt="Package Thumbnail" />
            </PackageThumbneil>
            <PackageBody className="flex flex-col gap-1">
              <Text styles={"small"}>{name}</Text>
              <HStack>
                <Text styles={"details"} className="text-muted-foreground">
                  {dimension} • {weight}
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
    cell: ({ row }: any) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }: any) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as Payment["status"];
      return <div className="flex justify-center">{getStatusTag(status)}</div>;
    },
  },
  {
    accessorKey: "requestedon",
    header: ({ column }: any) => {
      return (
        <Button
          variant="ghost"
          className="text-sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Requested On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
