"use client";

import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Star, StarHalf } from "lucide-react";
import { cn } from "node_modules/@qt/ui/lib/utils";

import { Avatar, AvatarImage } from "@qt/ui/avatar";
import { Button, buttonVariants } from "@qt/ui/button";
import { Package, PackageBody, PackageThumbneil } from "@qt/ui/package";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export type Partner = {
  id: string;
  email: string;
  fullname: string;
  phoneNo: number;
  packagesDelivered: number;
  rating: number;
};

// Function to return JSX tag based on status

export const columns: ColumnDef<Partner>[] = [
  {
    accessorKey: "partnerID",
    header: "Partner",
    cell({ row }) {
      const { id, fullname, email } = row.original as Partner;
      return (
        <Link href={`/partner-details/${id}`}>
          <HStack
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-fit w-full max-w-full justify-start",
            )}
          >
            <Avatar>
              <AvatarImage src="https://github.com//shadcn.png" />
            </Avatar>
            <VStack className="gap-1">
              <Text styles={"small"}>{fullname}</Text>
              <Text styles={"details"} className="text-muted-foreground">
                {email}
              </Text>
            </VStack>
          </HStack>
        </Link>
      );
    },
  },
  {
    accessorKey: "phoneNo",
    header: "Phone no",
  },
  {
    accessorKey: "packagesDelivered",
    header: "Packages Delivered",
    cell({ row }) {
      const { packagesDelivered } = row.original as Partner;
      return <div className="flex justify-center">{packagesDelivered}</div>;
    },
  },
  {
    accessorKey: "averageRating",
    header: "Average Rating",
    cell({ row }) {
      const { rating } = row.original as Partner;

      // Function to generate stars based on rating
      const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
          stars.push(<Star key={i} size={15} className="text-yellow-600" />);
        }
        if (halfStar) {
          stars.push(
            <StarHalf key={fullStars} size={15} className="text-yellow-600" />,
          );
        }
        return stars;
      };

      return (
        <PackageBody className="flex flex-col gap-1">
          {/* Render stars based on rating */}
          <Text styles={"table_item"} className="flex">
            {renderStars(rating)}
          </Text>
        </PackageBody>
      );
    },
  },
];
