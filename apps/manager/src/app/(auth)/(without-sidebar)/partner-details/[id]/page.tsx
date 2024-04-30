import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  FileDown,
  MoreHorizontalIcon,
  Star,
  StarIcon,
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@qt/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@qt/ui/dialog";

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
      <VStack className="h-full max-h-fit w-full gap-5">
        <HStack className="relative grid h-full max-h-fit w-full grid-cols-4">
          <VStack className="col-span-3">
            <Card className="col-span-3 w-full shadow-none">
              <CardHeader>
                <HStack className="items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <Button asChild size={"icon"} variant={"ghost"}>
                      <Link href={"/pickUp-partner"}>
                        <ArrowLeft className="h-7 w-7" />
                      </Link>
                    </Button>
                    Partner Details
                  </CardTitle>
                  <HStack>
                    
                          <Dialog>
                            <DialogTrigger className="mt-2">Legal Documents</DialogTrigger>
                            <DialogContent>
                              <DialogHeader className="flex flex-col gap-3">
                                <DialogTitle >Legal Documents</DialogTitle>
                                <DialogDescription>
                                  <HStack>
                                  <VStack className="gap-2 w-56 items-center">
                                    <img src="/package-1.jpg" className="w-full h-36 border" />                                 
                                    <Button
                                        size={"md"}
                                        className="text-primary hover:text-primary flex gap-1 "
                                        variant={"ghost"}
                                    ><FileDown className="h-4 w-4" /> 
                                    <Text styles={"subtle_medium"} className="pt-1">ID Card</Text>
                                    </Button>
                                  </VStack>
                                  <VStack className="gap-2 w-56 items-center">
                                  <img src="/package-1.jpg" className="w-full h-36 border" />
                                    <Button
                                        size={"md"}
                                        className="text-primary hover:text-primary flex gap-1 "
                                        variant={"ghost"}
                                    ><FileDown className="h-4 w-4" /> 
                                    <Text styles={"subtle_medium"} className="pt-1">Driving Licence</Text>
                                    </Button>
                                  </VStack>
                                  </HStack>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>

                    <div className='h-20 '>
                      <DropdownMenu>

                        <DropdownMenuTrigger> <div className=' h-10 p-2'><MoreHorizontalIcon size={20} color="#000000" /> </div></DropdownMenuTrigger>

                        <DropdownMenuContent className='mx-5'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Remove Partner</DropdownMenuItem>
                          <DropdownMenuItem>Edit Partner</DropdownMenuItem>

                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </HStack>
                </HStack>
              </CardHeader>
              <CardContent>
                <HStack className="gap-8">
                  <div className="flex-3 h-fit max-h-[328px] w-full max-w-[389px] rounded-radius border">

                    <div className="relative h-[320px] rounded-sm">
                      <Image src={"/package-1.jpg"} fill alt="package" />
                    </div>
                  </div>

                  <VStack className=" w-full">
                    <Text styles={"h4"} >
                      Elizabeth Lopez
                    </Text>
                    <Text styles={"lead"}>
                      {"elopez@yahoo.com"}
                    </Text>
                    <Text styles={"lead"}>
                      {"(719) 810-1058"}
                    </Text>
                    <Tag className="bg-gray-200 border-gray-300">
                      <StarIcon color="gray" className="h-5" />
                      <StarIcon color="gray" className="h-5" />
                      <StarIcon color="gray" className="h-5" />
                      <StarIcon color="gray" className="h-5" />
                    </Tag>
                  </VStack>
                </HStack>
              </CardContent>
            </Card>
            <Card className=" w-full shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            Assigned Packages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
          </VStack>

          <Card className="sticky top-0 h-full max-h-full w-full shadow-none">
            

          </Card>
        </HStack>
      </VStack>
      
    </VStack>
  );
}