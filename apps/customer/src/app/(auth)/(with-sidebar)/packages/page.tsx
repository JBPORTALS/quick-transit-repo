import React from "react";

import { columns, Payment } from "./columns";
import { DataTable } from "./dataTable";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "abcdefgh1234",
      amount: 100,
      status: "failed",
      email: "naga@gmail.com",
      name: "DSIT Question Paper",
      dimension: "42x42",
      weight: "1 KG",
      requestedon: "a day ago",
    },
    {
      id: "abcdefgh1234",
      amount: 200,
      status: "pending",
      email: "naga@gmail.com",
      name: "KSIT Question Paper",
      dimension: "29x40",
      weight: "0.5 KG",
      requestedon: "2 days ago",
    },
    {
      id: "abcdefgh1234",
      amount: 200,
      status: "pending",
      email: "naga@gmail.com",
      name: "KSIT Question Paper",
      dimension: "29x40",
      weight: "0.5 KG",
      requestedon: "2 days ago",
    },
    {
      id: "abcdefgh1234",
      amount: 200,
      status: "pending",
      email: "naga@gmail.com",
      name: "KSIT Question Paper",
      dimension: "29x40",
      weight: "0.5 KG",
      requestedon: "2 days ago",
    },
    {
      id: "abcdefgh1234",
      amount: 200,
      status: "pending",
      email: "naga@gmail.com",
      name: "KSIT Question Paper",
      dimension: "29x40",
      weight: "0.5 KG",
      requestedon: "2 days ago",
    },
    {
      id: "abcdefgh1234",
      amount: 20000,
      status: "pending",
      email: "naga@gmail.com",
      name: "KSIT Question Paper",
      dimension: "29x40",
      weight: "0.5 KG",
      requestedon: "2 days ago",
    },
    {
      id: "abcdefgh1234",
      amount: 200,
      status: "success",
      email: "naga@gmail.com",
      name: "KSIT Question Paper",
      dimension: "29x40",
      weight: "0.5 KG",
      requestedon: "2 days ago",
    },
    {
      id: "abcdefgh1234",
      amount: 200,
      status: "success",
      email: "naga@gmail.com",
      name: "KSIT Question Paper",
      dimension: "29x40",
      weight: "0.5 KG",
      requestedon: "2 days ago",
    },
    {
      id: "abcdefgh1234",
      amount: 200,
      status: "success",
      email: "naga@gmail.com",
      name: "KSIT Question Paper",
      dimension: "29x40",
      weight: "0.5 KG",
      requestedon: "2 days ago",
    },
    {
      id: "abcdefgh1234",
      amount: 200,
      status: "success",
      email: "naga@gmail.com",
      name: "KSIT Question Paper",
      dimension: "29x40",
      weight: "0.5 KG",
      requestedon: "2 days ago",
    },
    {
      id: "abcdefgh1234",
      amount: 200,
      status: "success",
      email: "naga@gmail.com",
      name: "KSIT Question Paper",
      dimension: "29x40",
      weight: "0.5 KG",
      requestedon: "2 days ago",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return <DataTable columns={columns} data={data} />;
}
