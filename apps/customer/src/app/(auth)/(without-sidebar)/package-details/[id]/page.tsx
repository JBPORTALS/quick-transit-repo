import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2Icon,
  FileDown,
  MoreHorizontalIcon,
  StarIcon,
  TruckIcon,
} from "lucide-react";

import { Button } from "@qt/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@qt/ui/card";
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
    <VStack className="h-full max-h-fit w-full gap-5">
      <HStack className="relative grid h-full max-h-fit w-full grid-cols-4">
        <VStack className="col-span-3">
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
                <HStack>
                  <Button
                    size={"md"}
                    className="text-primary hover:text-primary"
                    variant={"ghost"}
                  >
                    <FileDown className="h-5 w-5" /> Invoice
                  </Button>
                  <Button size={"icon"} variant={"ghost"}>
                    <MoreHorizontalIcon />
                  </Button>
                </HStack>
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
                  <Separator />
                  <Text styles={"subtle_semibold"}>{"Pick-up Address"}</Text>
                  <Text styles={"subtle"}>
                    {"#678, Magadi Road, Chintamani, Banglore 512 076"}
                  </Text>
                  <Separator />
                  <Text styles={"subtle_semibold"}>
                    {"Received Franchise Address"}
                  </Text>
                  <Text styles={"subtle"}>
                    {"#678, Magadi Road, Chintamani, Banglore 512 076"}
                  </Text>
                  <Separator />
                  <Text styles={"subtle_semibold"}>
                    {"Destination Address"}
                  </Text>
                  <Text styles={"subtle"}>
                    {"#678, Magadi Road, Chintamani, Banglore 512 076"}
                  </Text>
                  <Separator />
                  <Text styles={"subtle_semibold"}>{"Amount Charged"}</Text>
                  <HStack className="items-center">
                    <Text styles={"subtle"}>{"₹ 6,000"}</Text>
                    <Tag variant={"success"}>
                      <CheckCircle2Icon className="h-4 w-4" />
                      Paid
                    </Tag>
                  </HStack>
                </VStack>
              </HStack>
            </CardContent>
          </Card>

          <Card className=" w-full shadow-none">
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
          </Card>
        </VStack>

        <div className="sticky top-20">
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
                        <FileDown className="mr-2 h-4 w-4" /> Download Service
                        Bill
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
