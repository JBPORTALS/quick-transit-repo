"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { isEmpty, isUndefined } from "lodash";
import { PackageIcon, StarIcon, User2Icon } from "lucide-react";

import { RouterOutputs } from "@qt/api";
import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Package, PackageBody, PackageThumbneil } from "@qt/ui/package";
import { Separator } from "@qt/ui/seperator";
import { HStack, VStack } from "@qt/ui/stack";
import { StatusTag } from "@qt/ui/status-tag";
import { Text } from "@qt/ui/text";

import { api } from "~/trpc/react";

export default function PackageDetails({
  initialData,
}: {
  initialData: RouterOutputs["packages"]["getByPartnerId"];
}) {
  const params = useParams();
  const id = params.id as string;
  const { data } = api.packages.getByPartnerId.useQuery(
    { id },
    { initialData },
  );

  if (isEmpty(data))
    return (
      <div className="flex w-full items-center justify-center py-10">
        No packages yet
      </div>
    );
  return (
    <>
      {data.map((packageDetails) => {
        const review = packageDetails.reviews.filter(
          ({ type }) => type === "partner",
        )[0];
        return (
          <>
            <Package asChild>
              <Link href={`/package-details/${packageDetails.package_id}`}>
                <VStack className="w-full">
                  <HStack className="w-full">
                    <PackageThumbneil className="flex items-center justify-center">
                      <PackageIcon className="size-20 text-muted-foreground" />
                    </PackageThumbneil>
                    <HStack
                      key={packageDetails.id}
                      className="w-full justify-between"
                    >
                      <PackageBody className="flex flex-col gap-1">
                        <Text styles={"small"}>
                          {packageDetails.package.title}
                        </Text>
                        <HStack>
                          <Text
                            styles={"details"}
                            className="text-muted-foreground"
                          >
                            {packageDetails.package.height}x
                            {packageDetails.package.breadth}x
                            {packageDetails.package.width} •{" "}
                            {packageDetails.package.weight}
                          </Text>
                        </HStack>
                      </PackageBody>
                      <StatusTag status={packageDetails.current_status} />
                    </HStack>
                  </HStack>
                  {packageDetails.current_status === "delivered" && (
                    <VStack>
                      <Text
                        styles={"subtle_semibold"}
                        className="text-muted-foreground"
                      >
                        {review ? "Customer Review" : "No Customer Review"}
                      </Text>

                      {review && (
                        <HStack>
                          <Avatar className="size-8 overflow-hidden border-2">
                            <AvatarImage
                              src={
                                packageDetails.package.customer.picture ?? ""
                              }
                            />
                            <AvatarFallback className="bg-primary/20">
                              <User2Icon className="mt-4 size-full scale-105 fill-primary text-transparent " />
                            </AvatarFallback>
                          </Avatar>
                          <VStack className="gap-1 ">
                            <Text className="text-sm font-semibold ">
                              {packageDetails.package.customer.name}
                            </Text>
                            <Text
                              className={
                                "inline-flex items-center gap-1 text-sm text-amber-600"
                              }
                            >
                              <StarIcon className={"size-2 fill-amber-600"} />
                              {review?.rating}
                            </Text>
                            <span className="font-normal">
                              {review.comment}
                            </span>
                          </VStack>
                        </HStack>
                      )}
                    </VStack>
                  )}
                </VStack>
              </Link>
            </Package>
            <Separator />
          </>
        );
      })}
    </>
  );
}
