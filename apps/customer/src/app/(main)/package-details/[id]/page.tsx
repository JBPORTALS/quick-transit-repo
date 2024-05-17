import React from "react";
import Link from "next/link";
import { format, parse } from "date-fns";
import {
  BoxIcon,
  CalendarIcon,
  ClockIcon,
  FileDown,
  IndianRupeeIcon,
  MoreHorizontalIcon,
  MoveHorizontalIcon,
  PackageIcon,
  ReceiptCentIcon,
  ReceiptIndianRupeeIcon,
  RocketIcon,
  ScaleIcon,
  StarIcon,
  TagIcon,
  TextQuote,
  TextQuoteIcon,
  TruckIcon,
} from "lucide-react";

import { Badge } from "@qt/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@qt/ui/bread-crumbs";
import { Button } from "@qt/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@qt/ui/card";
import { Separator } from "@qt/ui/seperator";
import { HStack, VStack } from "@qt/ui/stack";
import { Table, TableBody, TableCell, TableRow } from "@qt/ui/table";
import { Tag } from "@qt/ui/tag";
import { Text } from "@qt/ui/text";

import { api } from "~/trpc/server";

function convertTo12HourFormat(time24: string) {
  // Parse the time string into a Date object
  const date = parse(time24, "HH:mm:ss", new Date());

  // Format the Date object into 12-hour format with AM/PM
  const formattedTime = format(date, "h:mm a");

  return formattedTime;
}

export default async function PackageDetails({
  params,
}: {
  params: { id: string };
}) {
  const formatToINR = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });
  const packageDetail = await api.packages.getById({ id: params.id });
  console.log(packageDetail);
  if (!packageDetail) return null;
  return (
    <VStack className="h-full max-h-fit w-full gap-5">
      <HStack className="relative grid h-full max-h-fit w-full grid-cols-10 gap-5">
        <VStack className="col-span-7">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={"/dashboard"}>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={"/packages"}>Packages</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>{packageDetail?.title}</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Card className="col-span-3 w-full border-none bg-background px-0 shadow-none">
            <CardHeader className="px-0">
              <HStack className="items-center justify-between">
                <VStack>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    {packageDetail?.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Tracking Number: #{packageDetail?.request.tracking_number}
                  </CardDescription>
                </VStack>
                <HStack className="items-center">
                  <Button size={"sm"} variant={"outline"}>
                    <FileDown className="h-5 w-5" /> Invoice
                  </Button>
                  <Button size={"icon"} variant={"ghost"}>
                    <MoreHorizontalIcon />
                  </Button>
                </HStack>
              </HStack>
            </CardHeader>
            <CardContent className="px-0">
              <HStack className="gap-8">
                <VStack className=" w-full">
                  {/* <HStack>
                    <Tag>
                      {packageDetail?.height}x{packageDetail?.breadth}x
                      {packageDetail?.width} cm
                    </Tag>
                    <Tag>{packageDetail?.weight}kg</Tag>
                  </HStack> */}
                  <Table className="border-spacing-5">
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className="col-span-1 flex items-center gap-2 text-muted-foreground"
                          >
                            <TextQuoteIcon className="size-5" /> Description
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className="col-span-2 w-full font-thin"
                          >
                            {packageDetail?.description}
                          </Text>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className="col-span-1 flex items-center gap-2 text-muted-foreground"
                          >
                            <BoxIcon className="size-5" /> Dimensions
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className="col-span-2 w-full font-thin"
                          >
                            {packageDetail?.height}x{packageDetail?.breadth}x
                            {packageDetail?.width}
                          </Text>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className="col-span-1 flex items-center gap-2 text-muted-foreground"
                          >
                            <ScaleIcon className="size-5" /> Weight
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className="col-span-2 w-full font-thin"
                          >
                            {packageDetail?.weight}kg
                          </Text>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className="col-span-1 flex items-center gap-2 text-muted-foreground"
                          >
                            <TagIcon className="size-5" /> Category
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className="col-span-2 w-full font-thin"
                          >
                            {packageDetail?.category.name}
                          </Text>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className=" flex items-center gap-2 text-nowrap text-muted-foreground"
                          >
                            <RocketIcon className="size-5" /> Courier Service
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className="col-span-2 w-full font-thin"
                          >
                            {packageDetail?.courier.name}
                          </Text>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className=" flex items-center gap-2 text-nowrap text-muted-foreground"
                          >
                            <CalendarIcon className="size-5" /> Delivery Date
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className="col-span-2 w-full font-thin"
                          >
                            {packageDetail?.delivery_date &&
                              format(
                                packageDetail.delivery_date,
                                "do MMM yyyy",
                              )}
                          </Text>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className=" flex items-center gap-2 text-nowrap text-muted-foreground"
                          >
                            <ClockIcon className="size-5" /> Time Slot
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className="col-span-2 flex  w-full items-center gap-1 font-thin"
                          >
                            <Badge variant={"secondary"}>
                              {packageDetail?.from_time &&
                                convertTo12HourFormat(packageDetail?.from_time)}
                            </Badge>
                            <MoveHorizontalIcon className="size-4" />
                            <Badge variant={"secondary"}>
                              {packageDetail?.to_time &&
                                convertTo12HourFormat(packageDetail?.to_time)}
                            </Badge>
                          </Text>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Text
                            styles={"small"}
                            className=" flex items-center gap-2 text-nowrap text-muted-foreground"
                          >
                            <ReceiptIndianRupeeIcon className="size-5" /> Total
                            Amount
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text
                            styles={"lead"}
                            className="col-span-2 flex  w-full items-center gap-1 font-thin"
                          >
                            {formatToINR.format(packageDetail.bill.total)}
                          </Text>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </VStack>
                <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-radius border bg-muted">
                  <PackageIcon className="size-32 text-muted-foreground/30" />
                </div>
                {/* <Carousel className="relative w-full max-w-xs">
                  <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-4xl font-semibold">
                                {index + 1}
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute inset-0 flex h-full w-full items-center justify-between px-4">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </Carousel> */}
              </HStack>
            </CardContent>
          </Card>

          {/* <Card className=" w-full shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                Other Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              nulla nostrum laudantium deserunt facilis sint obcaecati nam, odio
              perferendis quis perspiciatis, est, provident ullam. Doloremque
              aspernatur ipsam molestiae consequatur nam? Lorem ipsum dolor, sit
              amet consectetur adipisicing elit. Maxime repellendus, dolores ex
              voluptate saepe ratione, atque accusantium aut iste quidem eius
              reiciendis adipisci dolor quia veritatis eligendi fugit earum
              assumenda?
            </CardContent>
          </Card> */}
        </VStack>

        <div className="sticky top-20 col-span-3 w-full">
          <Card className="h-fit max-h-full w-full shadow-none">
            <CardHeader>
              <HStack className="items-center justify-between">
                <CardTitle>Traking Details</CardTitle>
                <Tag variant={"gray"} className="py-2">
                  <TruckIcon className="h-5 w-5" />
                  <Text styles={"body_medium"}>Picking Up</Text>
                </Tag>
              </HStack>
            </CardHeader>
            <CardContent>
              <VStack className="w-full">
                {/* Map */}
                <VStack className="w-full items-center justify-center gap-0">
                  <HStack className="h-fit w-full items-start gap-0 ">
                    <VStack className="h-full flex-1 items-center gap-0">
                      <div className="h-5 w-5 rounded-full bg-primary"></div>
                      <Separator className="h-12" orientation="vertical" />
                    </VStack>
                    <VStack className="w-full gap-1 px-3">
                      <Text styles={"body"} className="left-0">
                        Requested
                      </Text>
                      <Text styles={"details"} className="w-full"></Text>
                    </VStack>
                  </HStack>
                  <HStack className="h-fit w-full items-start gap-0 ">
                    <VStack className="h-full flex-1 items-center gap-0">
                      <div className="h-5 w-5 rounded-full bg-primary"></div>
                      <Separator className="h-12" orientation="vertical" />
                    </VStack>
                    <VStack className="w-full gap-1 px-3">
                      <Text styles={"body"} className="left-0">
                        Confirmed
                      </Text>
                      <Text styles={"details"} className="w-full"></Text>
                    </VStack>
                  </HStack>
                  <HStack className="h-fit w-full items-start gap-0 ">
                    <VStack className="h-full flex-1 items-center gap-0">
                      <div className="h-5 w-5 rounded-full bg-primary"></div>
                      <Separator className="h-12" orientation="vertical" />
                    </VStack>
                    <VStack className="w-full gap-1 px-3">
                      <Text styles={"body"} className="left-0">
                        Picking Up
                      </Text>
                      <Text styles={"details"} className="w-full"></Text>
                    </VStack>
                  </HStack>
                  <HStack className="h-fit w-full items-start gap-0 ">
                    <VStack className="h-full flex-1 items-center gap-0">
                      <div className="h-5 w-5 rounded-full bg-primary"></div>
                      <Separator className="h-12" orientation="vertical" />
                    </VStack>
                    <VStack className="w-full gap-1 px-3">
                      <Text styles={"body"} className="left-0">
                        Shipping
                      </Text>
                      <Text styles={"details"} className="w-full"></Text>
                    </VStack>
                  </HStack>
                  <HStack className="h-fit w-full items-start gap-0 ">
                    <VStack className="h-full flex-1 items-center gap-0">
                      <div className="h-5 w-5 rounded-full bg-primary"></div>
                      {/* <Separator className="h-12" orientation="vertical" /> */}
                    </VStack>
                    <VStack className="w-full gap-1 px-3">
                      <Text styles={"body"} className="left-0">
                        Delivered
                      </Text>
                      <Text
                        styles={"details"}
                        className="w-full text-muted-foreground"
                      >
                        Your package is delivered. ✅
                      </Text>
                      <Text
                        styles={"details"}
                        className="w-full text-muted-foreground"
                      >
                        Tracking ID: #2828337383
                      </Text>
                      <Button size={"sm"} variant={"link"} className="px-0">
                        <FileDown className="h-4 w-4" /> Download Service Bill
                      </Button>
                    </VStack>
                  </HStack>
                </VStack>
                <Separator />
                <HStack className="flex w-full items-center justify-between">
                  <div className="flex gap-3">
                    <img
                      src="https://github.com/shadcn.png"
                      className="w-15 h-12 rounded-md"
                    />
                    <div className="flex flex-col gap-2">
                      <h1 className="text-sm font-semibold text-card-foreground">
                        Elizabeth Lopez
                      </h1>
                      <HStack className="gap-1">
                        <StarIcon className="h-4 w-4" color="#eff226" />
                        <StarIcon className="h-4 w-4" color="#eff226" />
                        <StarIcon className="h-4 w-4" color="#eff226" />
                        <StarIcon className="h-4 w-4" color="#A3A3A3" />
                        <StarIcon className="h-4 w-4" color="#A3A3A3" />
                      </HStack>
                    </div>
                  </div>
                  <Button variant={"outline"}>Call</Button>
                </HStack>
              </VStack>
            </CardContent>
          </Card>
        </div>
      </HStack>
    </VStack>
  );
}
