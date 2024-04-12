"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@qt/ui/button";
import { Package, PackageBody, PackageThumbneil } from "@qt/ui/package";
import { HStack } from "@qt/ui/stack";
import { Tags } from "@qt/ui/tags";
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
      return <Tags variant="pending">Pending</Tags>;
    case "success":
      return <Tags variant="success">Success</Tags>;
    case "failed":
      return <Tags variant="error">Failed</Tags>;
    default:
      return <Tags variant="error">Unknown</Tags>;
  }
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "package",
    header: () => <div>Package</div>,
    cell({ row }) {
      const { name, dimension, weight } = row.original as Payment;
      return (
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
