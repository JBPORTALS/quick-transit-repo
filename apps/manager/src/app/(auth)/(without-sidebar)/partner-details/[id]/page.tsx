import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  FileDown,
  FilesIcon,
  MoreHorizontalIcon,
  PhoneCallIcon,
  Star,
  StarIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@qt/ui/accordion";
import { AspectRatio } from "@qt/ui/aspect-ratio";
import { Button } from "@qt/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@qt/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@qt/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@qt/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@qt/ui/dropdown-menu";
import { Separator } from "@qt/ui/seperator";
import { HStack, VStack } from "@qt/ui/stack";
import { Tag } from "@qt/ui/tag";
import { Text } from "@qt/ui/text";

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
      rating: 3,
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
      rating: 3,
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
      rating: 3,
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
      rating: 3,
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
      rating: 3,
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
      rating: 3,
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
      rating: 3.5,
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
      rating: 3.5,
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
      rating: 2,
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
      rating: 3,
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
      rating: 2,
    },
  ];
}

export default async function PackageDetails() {
  const data = await getData();
  return (
    <VStack className="h-full max-h-fit w-full gap-5">
      <HStack className="w-full gap-8 px-32 py-5">
        <div className="w-96">
          <AspectRatio
            ratio={1 / 1}
            className="overflow-hidden rounded-full border-2 border-input bg-muted"
          >
            <Image
              src={"https://github.com/shadcn.png"}
              fill
              alt="partner"
              className="object-cover"
            />
          </AspectRatio>
        </div>

        <VStack className="h-full w-full gap-10">
          <HStack className="gap-28">
            <VStack className="gap-1">
              <Text className="text-muted-foreground">Assigned</Text>
              <Text styles={"p_ui_medium"}>28,256</Text>
            </VStack>
            <VStack className="gap-1">
              <Text className="text-muted-foreground">Shipping</Text>
              <Text styles={"p_ui_medium"}>23</Text>
            </VStack>
            <VStack className="gap-1">
              <Text className="text-muted-foreground">Delivered</Text>
              <Text styles={"p_ui_medium"}>28,333</Text>
            </VStack>
            <VStack className="gap-1">
              <Text className="text-muted-foreground">
                {"Average Ratings (4.0)"}
              </Text>
              <HStack className="gap-1">
                <StarIcon className="h-5 w-5 text-yellow-600" />
                <StarIcon className="h-5 w-5 text-yellow-600" />
                <StarIcon className="h-5 w-5 text-yellow-600" />
                <StarIcon className="h-5 w-5 text-yellow-600" />
                <StarIcon className="h-5 w-5 text-muted-foreground" />
              </HStack>
            </VStack>
            <Button size={"icon"} variant={"ghost"}>
              <MoreHorizontalIcon />
            </Button>
          </HStack>
          <VStack className="gap-2">
            <Text styles={"h4"}>Elizabeth Lopez</Text>
            <Text styles={"p_ui"} className="text-muted-foreground">
              {"elopez@yahoo.com"}
            </Text>
            <Text styles={"subtle"} className="text-muted-foreground">
              {"(719) 810-1058"}
            </Text>
          </VStack>
          <HStack>
            <Button size={"lg"}>
              <PhoneCallIcon className="h-5 w-5" />
              Contact
            </Button>
            <Button variant={"outline"} size={"lg"}>
              <FilesIcon className="h-5 w-5" />
              Legal Documents
            </Button>
          </HStack>
        </VStack>
      </HStack>
      <Separator />
      <VStack className="w-full px-32">
        <Text styles={"h3"}>Assigned Packages</Text>
        <DataTable columns={columns} data={data} />
      </VStack>
    </VStack>
  );
}
