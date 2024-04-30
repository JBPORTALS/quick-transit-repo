"use client";
import { ReactNode } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Star, StarHalf } from "lucide-react";

import { Button } from "@qt/ui/button";
import { Package, PackageBody, PackageThumbneil } from "@qt/ui/package";
import { Text } from "@qt/ui/text";
import { HStack } from '@qt/ui/stack';

export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "success" | "failed";
    email: string;
    name: string;
    dimension: string;
    weight: string;
    requestedon: string;
    rating:number;
};

// Function to return JSX tag based on status


export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "slno",
        header: "SL NO",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "requestID",
        header: "Request ID",
        cell({ row }) {
            const { id } = row.original as Payment;
            return (
                <Link href={`/request-details/${id}`}>
                    <Package>
                        <PackageBody className="flex flex-col gap-1">
                            <Text styles={"table_item"}>{id}</Text>
                        </PackageBody>
                    </Package>
                </Link>
            );
        },
    },
    {
    accessorKey: "package",
    header: () => <div>Package</div>,
    cell({ row }) {
      const { name, dimension, weight, id } = row.original as Payment;
      return (
        <Link href={`/package-details/${id}`}>
          <Package>
            <PackageThumbneil>
              <Image src={"/package-1.jpg"} fill alt="Package Thumbnail" />
            </PackageThumbneil>
            <PackageBody className="flex flex-col gap-1">
              <Text styles={"small"}>{name}</Text>
              <HStack>
                <Text styles={"details"} className="text-muted-foreground">
                  {dimension} • {weight}
                </Text>
              </HStack>
            </PackageBody>
          </Package>
        </Link>
      );
    },
  },
    {
        accessorKey: "requestedon",
        header: ({ column }: any) => {
            return (
                <Button
                    variant="ghost"
                    className="text-sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Requested On
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "averageRating",
        header: "Average Rating",
        cell({ row }) {
            const { rating, id } = row.original as Payment;
    
            // Function to generate stars based on rating
            const renderStars = (rating: number) => {
                const fullStars = Math.floor(rating);
                const halfStar = rating - fullStars >= 0.5;
                const stars = [];
                for (let i = 0; i < fullStars; i++) {
                    stars.push(<Star key={i} size={15}/>);
                }
                if (halfStar) {
                    stars.push(<StarHalf key={fullStars} size={15} />);
                }
                return stars;
            };
    
            return (
                <Link href={`/request-details/${id}`}>
                    <Package>
                        <PackageBody className="flex flex-col gap-1">
                            {/* Render stars based on rating */}
                            <Text styles={"table_item"} className='flex'>
                                {renderStars(rating)}
                            </Text>
                        </PackageBody>
                    </Package>
                </Link>
            );
        },
    }    
];