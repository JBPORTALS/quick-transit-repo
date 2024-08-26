"use client";

import React from "react";
import Link from "next/link";
import { format, parse } from "date-fns";
import {
  BoxIcon,
  CalendarIcon,
  ClockIcon,
  FileDown,
  MoveHorizontalIcon,
  PackageIcon,
  ReceiptIndianRupeeIcon,
  RocketIcon,
  ScaleIcon,
  TagIcon,
  TextQuoteIcon,
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
import { Skeleton } from "@qt/ui/skeleton";
import { HStack, VStack } from "@qt/ui/stack";
import { Table, TableBody, TableCell, TableRow } from "@qt/ui/table";
import { Text } from "@qt/ui/text";

import PackageMoreDropdown from "~/app/_components/package-more-dropdown";
import { api } from "~/trpc/react";
import { PackageDetailsSkeleton } from "./skeleton";

function convertTo12HourFormat(time24: string) {
  // Parse the time string into a Date object
  const date = parse(time24, "HH:mm:ss", new Date());

  // Format the Date object into 12-hour format with AM/PM
  const formattedTime = format(date, "h:mm a");

  return formattedTime;
}

export default function PackageDetails({ params }: { params: { id: string } }) {
  const formatToINR = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });
  const { data: packageDetail, isLoading } = api.packages.getById.useQuery({
    id: params.id,
  });
  if (isLoading || !packageDetail) return <PackageDetailsSkeleton />;
  return (
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
                Tracking Number: {packageDetail?.request.tracking_number}
              </CardDescription>
            </VStack>
            {packageDetail.request.current_status !== "cancelled" && (
              <HStack className="items-center">
                <Button size={"sm"} variant={"outline"}>
                  <FileDown className="h-5 w-5" /> Invoice
                </Button>
                <PackageMoreDropdown packageId={params.id} />
              </HStack>
            )}
          </HStack>
          <div className="rounded-full bg-blue-900 px-4 py-1 text-center text-sm">
            <p>
              Your One Time Password to verify the package with delivery partner
              - <b>{packageDetail.request.one_time_code}</b>
            </p>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <HStack className="gap-8">
            <VStack className=" w-full">
              <Table className="border-spacing-5">
                <TableBody>
                  <TableRow>
                    <TableCell className="align-top">
                      <Text
                        styles={"small"}
                        className="col-span-1 flex items-center gap-2 text-muted-foreground"
                      >
                        <TextQuoteIcon className="size-5" /> Description
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text styles={"small"} className="col-span-2 w-full ">
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
                      <Text styles={"small"} className="col-span-2 w-full ">
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
                      <Text styles={"small"} className="col-span-2 w-full ">
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
                      <Text styles={"small"} className="col-span-2 w-full ">
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
                      <Text styles={"small"} className="col-span-2 w-full ">
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
                      <Text styles={"small"} className="col-span-2 w-full ">
                        {packageDetail?.delivery_date &&
                          format(packageDetail.delivery_date, "do MMM yyyy")}
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
                        className="col-span-2 flex  w-full items-center gap-1 "
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
                        className="col-span-2 flex  w-full items-center gap-1 "
                      >
                        {formatToINR.format(packageDetail.bill.total)}
                      </Text>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </VStack>
            <div className="flex aspect-square w-full max-w-[16rem] items-center justify-center rounded-radius border bg-muted">
              <PackageIcon className="size-32 text-muted-foreground/60" />
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

      <Card className="w-full border-none bg-background shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="flex items-center gap-3">
            Address Details
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <HStack className="h-full items-center gap-0">
            <Card className="h-full w-fit max-w-[17rem] flex-1">
              <CardHeader>
                <CardTitle className="text-sm">Pickup Address</CardTitle>
              </CardHeader>
              <CardContent>
                <VStack className="gap-2">
                  <Text styles={"subtle_medium"}>
                    +91 {packageDetail?.pick_up_address?.phone}
                  </Text>
                  <Text styles={"small"} className="text-muted-foreground">
                    {packageDetail?.pick_up_address?.street} -{" "}
                    {packageDetail?.pick_up_address?.pincode}
                  </Text>
                </VStack>
              </CardContent>
            </Card>
            <Separator className="flex-[.2]" />
            <div className="flex size-10 items-center justify-center rounded-full border">
              <RocketIcon size={23} />
            </div>
            <Separator className="flex-[.2]" />
            {/* <Card>
              <CardHeader>
                <CardTitle>Franchise Address</CardTitle>
              </CardHeader>
              <CardContent>
                <VStack className="gap-2">
                  <Text>+91 {packageDetail.franchise_address.phone}</Text>
                  <Text styles={"subtle"} className="text-muted-foreground">
                    {packageDetail.franchise_address.street} -{" "}
                    {packageDetail.franchise_address.pincode}
                  </Text>
                </VStack>
              </CardContent>
            </Card> */}
            <Card className="h-full w-[17rem] max-w-[17rem] flex-1">
              <CardHeader>
                <CardTitle className="text-sm">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <VStack className="gap-2">
                  <Text styles={"subtle_medium"}>
                    +91 {packageDetail?.destination_address?.phone}
                  </Text>
                  <Text styles={"small"} className="text-muted-foreground">
                    {packageDetail?.destination_address?.street} -{" "}
                    {packageDetail?.destination_address?.pincode}
                  </Text>
                </VStack>
              </CardContent>
            </Card>
          </HStack>
        </CardContent>
      </Card>
    </VStack>
  );
}
