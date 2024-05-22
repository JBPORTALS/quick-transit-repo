"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "./button"



export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  name: string
  slno: number
  requestid: string
  package: string
  dimension: string
  weight: string
  requestedon: string

}

  
export const columns: ColumnDef<Payment>[] = [
    // ...

    {
        accessorKey: "slno",
        header: "SlNo",
      },
      {
        accessorKey: "requestid",
        header: "RequestId",
      },
      {
        accessorKey: "package",
        header: "Package",
      },
    
      {
        accessorKey: "dimension",
        header: "Dimension",
      },
      {
        accessorKey: "weight",
        header: "Weight",
      },
      {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }:any) => {
          const amount = parseFloat(row.getValue("amount"))
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "INR",
          }).format(amount)   
    
          return <div className="text-right font-medium">{formatted}</div>
        },
      },
      {
        accessorKey: "status",
        header: ({ column }:any) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        }
      },
      {
        accessorKey: "requestedon",
        header: ({ column }:any) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Requested On
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        }   
      },
    
    
  ]