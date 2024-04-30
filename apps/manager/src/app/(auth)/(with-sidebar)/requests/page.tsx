import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2Icon,
  EllipsisVertical,
  FileDown,
  MoreHorizontalIcon,
  StarIcon,
  TruckIcon,
} from "lucide-react";

import { Button } from "@qt/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@qt/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@qt/ui/carousel";
import { HStack, VStack } from "@qt/ui/stack";
import { Tag } from "@qt/ui/tag";
import { Text } from "@qt/ui/text";
import { columns, Payment } from "./columns";
import { DataTable } from "./dataTable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@qt/ui/dropdown-menu";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "abcdefgh1234",
      amount: 100,
      status: "failed",
      email: "naga@gmail.com",
      name: "RJS Question Paper",
      dimension: "42x42",
      weight: "1 KG",
      partner: "akash",
      rating: 2,
    },
    {
      id: "abcdefgh1234",
      amount: 200,
      status: "success",
      email: "naga@gmail.com",
      name: "DSIT  Question Paper",
      dimension: "29x40",
      weight: "0.5 KG",
      partner: "aman",
      rating: 2.5,
    },
    {
      id: "abcdefgh1234",
      amount: 200,
      status: "success",
      email: "naga@gmail.com",
      name: "RJS Question Paper",
      dimension: "29x40",
      weight: "0.5 KG",
      partner: "naga",
      rating: 3,
    },
    {
      id: "abcdefgh1234",
      amount: 200,
      status: "success",
      email: "naga@gmail.com",
      name: "RJS Question Paper",
      dimension: "29x40",
      weight: "0.5 KG",
      partner: "akash",
      rating: 4.5,
    },
  ];
}

export default async function Requests() {
  const data = await getData();
  return (
    
      <DataTable columns={columns} data={data} />
   

  );
}