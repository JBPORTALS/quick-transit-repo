import React from "react";

import { columns, Payment } from "./columns";
import { DataTable } from "./dataTable";
import { HStack } from "@qt/ui/stack";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "abcdefgh1234",
      email: "naga@gmail.com",
      fullname: "Akash",
      phoneNo: 9876543210,
      packagesDelivered: 20,
      rating: 2.5,
    },
    {
      id: "abcdefgh1234",
      email: "naga@gmail.com",
      fullname: "Nagaraja",
      phoneNo: 9876543210,
      packagesDelivered: 20,
      rating: 3.7,
    },
    {
      id: "abcdefgh1234",
      email: "naga@gmail.com",
      fullname: "Aman",
      phoneNo: 9876543210,
      packagesDelivered: 20,
      rating: 4,
    },

  ];
}

export default async function DemoPage() {
  const data = await getData();

  return(
  
    <DataTable columns={columns} data={data} />
 
  );
}