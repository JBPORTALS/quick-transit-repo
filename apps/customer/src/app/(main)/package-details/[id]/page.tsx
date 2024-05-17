import React from "react";
import Link from "next/link";
import { format, parse } from "date-fns";
import {
  BoxIcon,
  CalendarIcon,
  ClockIcon,
  FileDown,
  MoreHorizontalIcon,
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
import { HStack, VStack } from "@qt/ui/stack";
import { Table, TableBody, TableCell, TableRow } from "@qt/ui/table";
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
  if (!packageDetail) return null;
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
            <div className="flex aspect-square w-full max-w-[16rem] items-center justify-center rounded-radius border bg-muted">
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
  );
}
