import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MoreHorizontalIcon, TruckIcon } from "lucide-react";

import { Button } from "@qt/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@qt/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@qt/ui/carousel";
import { Separator } from "@qt/ui/seperator";
import { HStack, VStack } from "@qt/ui/stack";
import { Tag } from "@qt/ui/tag";
import { Text } from "@qt/ui/text";

export default function PackageDetails() {
  return (
    <VStack className="w-full gap-5">
      <HStack className="grid w-full grid-cols-4">
        <Card className="col-span-3 w-full shadow-none">
          <CardHeader>
            <HStack className="items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <Button asChild size={"icon"} variant={"ghost"}>
                  <Link href={"/packages"}>
                    <ArrowLeft className="h-7 w-7" />
                  </Link>
                </Button>
                Package Details
              </CardTitle>
              <Button size={"icon"} variant={"ghost"}>
                <MoreHorizontalIcon />
              </Button>
            </HStack>
          </CardHeader>
          <CardContent>
            <HStack className="gap-8">
              <Carousel className="flex-3 h-fit max-h-[328px] w-full max-w-[389px] rounded-radius border">
                <CarouselContent>
                  <CarouselItem className="relative h-[328px] rounded-sm">
                    <Image src={"/package-1.jpg"} fill alt="package" />
                  </CarouselItem>
                  <CarouselItem className="relative h-[328px] w-full rounded-sm">
                    <Image src={"/package-1.jpg"} fill alt="package" />
                  </CarouselItem>
                  <CarouselItem className="relative h-[328px] w-full rounded-sm">
                    <Image src={"/package-1.jpg"} fill alt="package" />
                  </CarouselItem>
                </CarouselContent>
                <div className=" absolute bottom-1/2 top-1/2 w-full px-5">
                  <div className="flex justify-between">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </div>
              </Carousel>

              <VStack className=" w-full">
                <Text styles={"details"} className="text-muted-foreground">
                  #14254252622625
                </Text>
                <Text styles={"p_ui_medium"}>
                  {"DSIT Questions Papers (Bundle A)"}
                </Text>
                <HStack>
                  <Tag>34x34x6 cm</Tag>
                  <Tag>200g</Tag>
                </HStack>
                <Text styles={"details"} className="text-muted-foreground">
                  Requested on 3 hours ago
                </Text>
                <hr className="w-full text-muted-foreground" />
                <Text styles={"subtle_semibold"}>{"Pick-up Address"}</Text>
                <Text styles={"subtle"}>
                  {"#678, Magadi Road, Chintamani, Banglore 512 076"}
                </Text>
                <hr className="w-full text-muted-foreground" />

                <Text styles={"subtle_semibold"}>
                  {"Received Franchise Address"}
                </Text>
                <Text styles={"subtle"}>
                  {"#678, Magadi Road, Chintamani, Banglore 512 076"}
                </Text>
                <hr className="w-full text-muted-foreground" />

                <Text styles={"subtle_semibold"}>{"Destination Address"}</Text>
                <Text styles={"subtle"}>
                  {"#678, Magadi Road, Chintamani, Banglore 512 076"}
                </Text>
              </VStack>
            </HStack>
          </CardContent>
          <CardFooter>
            <VStack className="w-full flex-[0.2] items-end">
              <Text>6,000</Text>
            </VStack>
          </CardFooter>
        </Card>

        <Card className="w-full shadow-none">
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
            {/* Map */}
            <VStack className="w-fit items-center justify-center gap-0">
              <HStack className="items-center">
                <div className="h-5 w-5 rounded-full bg-primary"></div>
                {/* <Text styles={"body"}>Requested</Text> */}
              </HStack>
              <Separator orientation="vertical" className="h-12" />
              <HStack className="items-center">
                <div className="h-5 w-5 rounded-full bg-primary"></div>
                {/* <Text styles={"body"}>Confirmed</Text> */}
              </HStack>
              <Separator orientation="vertical" className="h-12" />
              <HStack className="items-center">
                <div className="h-5 w-5 rounded-full bg-primary"></div>
                {/* <Text styles={"body"}>Pick-Up</Text> */}
              </HStack>
              <Separator orientation="vertical" className="h-12" />
              <HStack className="items-center">
                <div className="h-5 w-5 rounded-full bg-primary"></div>
                {/* <Text styles={"body"}>Shipping</Text> */}
              </HStack>
              <Separator orientation="vertical" className="h-12" />
              <HStack className="items-center">
                <div className="h-5 w-5 rounded-full bg-primary"></div>
                {/* <Text styles={"body"}>Delivered</Text> */}
              </HStack>
            </VStack>
          </CardContent>
        </Card>
      </HStack>
    </VStack>
  );
}
