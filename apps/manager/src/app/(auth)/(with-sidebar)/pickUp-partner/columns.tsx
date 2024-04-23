"use client";

import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Star, StarHalf } from "lucide-react";

import { Button } from "@qt/ui/button";
import { Package, PackageBody, PackageThumbneil } from "@qt/ui/package";
import { Text } from "@qt/ui/text";

export type Payment = {
    id: string;
    email: string;
    fullname: string;
    phoneNo:number;
    packagesDelivered:number;
    rating:number
};

// Function to return JSX tag based on status


export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "slno",
        header: "SL NO",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "partnerID",
        header: "Partner ID",
        cell({ row }) {
            const { id } = row.original as Payment;
            return (
                <Link href={`/partner-details/${id}`}>
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
        accessorKey: "fullname",
        header: "Full Name",
      },
    {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phoneNo",
        header: "Phone no",
      },
      {
        accessorKey: "packagesDelivered",
        header: "Packages Delivered",
        cell({row}){
            const { packagesDelivered } = row.original as Payment;
            return(
                <div className="flex justify-center">
                    {packagesDelivered}
                </div>
            )
        }
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
                    stars.push(<StarHalf key={fullStars} size={15}  />);
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