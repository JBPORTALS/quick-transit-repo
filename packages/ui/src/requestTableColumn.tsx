"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "./button";
import { Tags } from "./tag";

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
    header: () => <div>Sl No</div>,
  },
  {
    accessorKey: "requestid",
    header: () => <div>Request ID</div>,
  },
  {
    accessorKey: "package",
    header: () => <div>Package</div>,
  },

  {
    accessorKey: "dimension",
    header: () => <div>Dimensions</div>,
  },
  {
    accessorKey: "weight",
    header: () => <div>Weight</div>,
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
