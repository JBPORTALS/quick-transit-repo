import Link from "next/link";
import { format } from "date-fns";
import { isUndefined } from "lodash";
import {
  BoxIcon,
  CalendarIcon,
  ClockIcon,
  FileDown,
  MoveHorizontalIcon,
  ReceiptIndianRupeeIcon,
  RocketIcon,
  ScaleIcon,
  TagIcon,
  TextQuoteIcon,
  XIcon,
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
import { Text } from "@qt/ui/text";

import CancelDialog from "~/app/_components/cancel-dialog";
import { api } from "~/trpc/server";
import { convertTo12HourFormat } from "~/utils/extra";

export default async function PackageDetails({
  params,
}: {
  params: { id: string };
}) {
  const formatToINR = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });
  const packageDetail = await api.packages.getById({
    id: params.id,
  });

  if (isUndefined(packageDetail))
    throw new Error("Ooops! Failed to fetch package details");

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
                  <FileDown className="size-4" /> Invoice
                </Button>
                {/* <Button variant={"outline"} size={"sm"}>
                  <Edit3Icon className="size-4" />
                  Update Details
                </Button> */}
                {["requested", "confirmed"].includes(
                  packageDetail.request.current_status,
                ) && (
                  <CancelDialog packageId={packageDetail.id}>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="border-destructive text-destructive hover:text-destructive"
                    >
                      <XIcon className="size-4" />
                      Cancell Request
                    </Button>
                  </CancelDialog>
                )}
              </HStack>
            )}
          </HStack>
          {packageDetail.request.current_status === "confirmed" && (
            <Badge
              variant={"secondary"}
              className="justify-center py-1.5 text-center font-medium"
            >
              <p>
                Your One Time Password to verify the package with delivery
                partner - <b>{packageDetail.request.one_time_code}</b>
              </p>
            </Badge>
          )}
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
                        <CalendarIcon className="size-5" /> Pickup Date
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text styles={"small"} className="col-span-2 w-full ">
                        {packageDetail?.pickup_date &&
                          format(packageDetail.pickup_date, "do MMM yyyy")}
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
                          {packageDetail?.timeslot.from_time &&
                            convertTo12HourFormat(
                              packageDetail?.timeslot.from_time,
                            )}
                        </Badge>
                        <MoveHorizontalIcon className="size-4" />
                        <Badge variant={"secondary"}>
                          {packageDetail?.timeslot.to_time &&
                            convertTo12HourFormat(
                              packageDetail?.timeslot.to_time,
                            )}
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
            <div className="flex aspect-square w-full max-w-[16rem] items-center justify-center rounded-radius border bg-accent/40">
              <h1 className="text-9xl">📦</h1>
            </div>
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
