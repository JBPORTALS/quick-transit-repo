"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "./button";
import { Tags } from "./tags";
import { Text } from "./text";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "success" | "failed";
  email: string;
  name: string;
  slno: number;
  requestid: string;
  package: string;
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
  // ...

  {
    accessorKey: "slno",
    header: () => <Text styles={"table_head"}>SlNo</Text>,
  },
  {
    accessorKey: "requestid",
    header: () => <Text styles={"table_head"}>RequestId</Text>,
  },
  {
    accessorKey: "package",
    header: () => <Text styles={"table_head"}>Package</Text>,
  },

  {
    accessorKey: "dimension",
    header: () => <Text styles={"table_head"}>Dimensions</Text>,
  },
  {
    accessorKey: "weight",
    header: () => <Text styles={"table_head"}>Weight</Text>,
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="text-right">
        <Text styles={"table_head"}>Amount</Text>
      </div>
    ),
    cell: ({ row }: any) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }: any) => {
      return (
        <Text styles={"table_head"}>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </Text>
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
        <Text styles={"table_head"}>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Requested On
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </Text>
      );
    },
  },
];
