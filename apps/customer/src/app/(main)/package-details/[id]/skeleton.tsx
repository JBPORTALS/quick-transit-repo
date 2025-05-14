import {
  BoxIcon,
  CalendarIcon,
  ClockIcon,
  MoveHorizontalIcon,
  ReceiptIndianRupeeIcon,
  RocketIcon,
  ScaleIcon,
  TagIcon,
  TextQuoteIcon,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@qt/ui/bread-crumbs";
import { Card, CardContent, CardHeader } from "@qt/ui/card";
import { Skeleton } from "@qt/ui/skeleton";
import { HStack, VStack } from "@qt/ui/stack";
import { Table, TableBody, TableCell, TableRow } from "@qt/ui/table";
import { Text } from "@qt/ui/text";

export function PackageDetailsSkeleton() {
  return (
    <VStack className="col-span-7">
      <Breadcrumb>
        <BreadcrumbList>
          <Skeleton className="h-4 w-16 rounded-full" />
          <BreadcrumbSeparator />
          <Skeleton className="h-4 w-16 rounded-full" />
          <BreadcrumbSeparator />
          <Skeleton className="h-4 w-16 rounded-full" />
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="col-span-3 w-full border-none bg-background px-0 shadow-none">
        <CardHeader className="px-0">
          <HStack className="items-center justify-between">
            <VStack>
              <Skeleton className="h-5 w-40 rounded-full" />
              <HStack className="items-center">
                Tracking Number: <Skeleton className="h-4 w-24 rounded-full" />
              </HStack>
            </VStack>
            <HStack className="items-center">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="size-10" />
            </HStack>
          </HStack>
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
                      <VStack className="gap-1">
                        <Skeleton className="h-3 w-44" />
                        <Skeleton className="h-3 w-32" />
                      </VStack>
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
                        <Skeleton className="h-4 w-20" />
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
                        <Skeleton className="h-4 w-12" />
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
                        <Skeleton className="h-4 w-20" />
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
                        <Skeleton className="h-4 w-20" />
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
                        <Skeleton className="h-4 w-20" />
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
                        <Skeleton className="h-4 w-16" />
                        <MoveHorizontalIcon className="size-4" />
                        <Skeleton className="h-4 w-16" />
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
                        <Skeleton className="h-6 w-24" />
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
    </VStack>
  );
}
