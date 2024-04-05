import * as React from "react";
import { CirclePlus, MapPin } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@qt/ui/carousel";

import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { HStack, VStack } from "./stack";
import { Tags } from "./tags";
import { Text } from "./text";

export default function PackagePriceDetails() {
  return (
    <div className="flex flex-col gap-5">
      <VStack className="gap-4">
        <Text styles={"h3"}>Overview</Text>
        <HStack className="gap-6">
          <Carousel className="max-h-[278px] max-w-[339px]">
            <CarouselContent>
              <CarouselItem>
                <img
                  src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                  alt=""
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                  alt=""
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                  alt=""
                />
              </CarouselItem>
            </CarouselContent>
            <div className=" absolute bottom-1/2 top-1/2 w-full px-5">
              <div className="flex justify-between">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>
          </Carousel>
          <VStack className="">
            <Text styles={"p_ui_medium"}>DSIT Questions Papers (Bundle A)</Text>
            <HStack>
              <Tags variant={"primary"}>78x23x120 cm</Tags>
              <Tags variant={"primary"}>200 g</Tags>
            </HStack>

            <HStack className="gap-10">
              <VStack>
                <Text styles={"body"}>Service Charge -</Text>

                <Text styles={"body"}>Insurance Charge -</Text>

                <Text styles={"body"}>Total Amount -</Text>
              </VStack>
              <VStack>
                <Text styles={"p_ui_medium"}>₹700</Text>

                <Text styles={"p_ui_medium"}>₹8000</Text>

                <Text styles={"p_ui_medium"}>₹8700</Text>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <Text styles={"large"}>Pick-up Address</Text>

        <ScrollArea className="h-full w-screen rounded-md ">
          <HStack className="w-full">
            <Dialog>
              <DialogTrigger>
                <div className="flex h-28 w-96 items-center gap-4  rounded-lg border-2 border-dashed border-primary/30 px-3">
                  <CirclePlus size={40} strokeWidth={1} />
                  <VStack className="">
                    <Text styles={"p_ui_medium"}>Add New Address</Text>
                    <Text styles={"details"}>
                      This Address will save for further uses also.
                    </Text>
                  </VStack>
                </div>
              </DialogTrigger>

              <DialogContent className="">
                <DialogHeader>
                  <Text styles={"large"} className="text-start">
                    Add New Address
                  </Text>
                </DialogHeader>

                <Label>Address</Label>
                <Input />
                <HStack className="justify-end">
                  <Button variant={"outline"}>Discard</Button>
                  <Button>Save</Button>
                </HStack>
              </DialogContent>
            </Dialog>

            <RadioGroup className="flex ">
              <div className="flex h-28 w-96  items-center justify-center gap-3 rounded-lg border-2 px-4">
                <RadioGroupItem
                  value="option-one"
                  className="border-2"
                  id="option-one"
                />
                <Label
                  htmlFor="option-one"
                  className="flex flex-col gap-1 py-2"
                >
                  <h1 className="text-base font-medium leading-6">Block A</h1>
                  <HStack className="text-xs font-medium leading-5">
                    <MapPin size={50} strokeWidth={1} />
                    <p className="pt-1">
                      Our customers uses this method at last moment of pick-up.
                    </p>
                  </HStack>
                </Label>
              </div>
              <div className="flex h-28 w-96  items-center justify-center gap-3 rounded-lg border-2 px-4">
                <RadioGroupItem
                  value="option-two"
                  className="border-2"
                  id="option-two"
                />
                <Label
                  htmlFor="option-two"
                  className="flex flex-col gap-1 py-2"
                >
                  <h1 className="text-base font-medium leading-6">Block B</h1>
                  <HStack className="text-xs font-medium leading-5">
                    <MapPin size={50} strokeWidth={1} />
                    <p className="pt-1">
                      Our customers uses this method at last moment of pick-up.
                    </p>
                  </HStack>
                </Label>
              </div>
            </RadioGroup>
          </HStack>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Text styles={"large"}>Received Franchise Address</Text>

        <ScrollArea className="h-full w-screen rounded-md ">
          <HStack className="w-full">
            <Dialog>
              <DialogTrigger>
                <div className="flex h-28 w-96 items-center gap-4  rounded-lg border-2 border-dashed border-primary/30 px-3">
                  <CirclePlus size={40} strokeWidth={1} />
                  <VStack className="">
                    <Text styles={"p_ui_medium"}>Add New Address</Text>
                    <Text styles={"details"}>
                      This Address will save for further uses also.
                    </Text>
                  </VStack>
                </div>
              </DialogTrigger>

              <DialogContent className="">
                <DialogHeader>
                  <Text styles={"large"} className="text-start">
                    Add New Address
                  </Text>
                </DialogHeader>

                <Label>Address</Label>
                <Input />
                <HStack className="justify-end">
                  <Button variant={"outline"}>Discard</Button>
                  <Button>Save</Button>
                </HStack>
              </DialogContent>
            </Dialog>

            <RadioGroup className="flex">
              <div className="flex h-28 w-96  items-center justify-center gap-3 rounded-lg border-2 px-4">
                <RadioGroupItem
                  value="option-three"
                  className="border-2"
                  id="option-three"
                />
                <Label
                  htmlFor="option-three"
                  className="flex flex-col gap-1 py-2"
                >
                  <h1 className="text-base font-medium leading-6">Block A</h1>
                  <HStack className="text-xs font-medium leading-5">
                    <MapPin size={50} strokeWidth={1} />
                    <p className="pt-1">
                      Our customers uses this method at last moment of pick-up.
                    </p>
                  </HStack>
                </Label>
              </div>
              <div className="flex h-28 w-96  items-center justify-center gap-3 rounded-lg border-2 px-4">
                <RadioGroupItem
                  value="option-four"
                  className="border-2"
                  id="option-four"
                />
                <Label
                  htmlFor="option-four"
                  className="flex flex-col gap-1 py-2"
                >
                  <h1 className="text-base font-medium leading-6">Block B</h1>
                  <HStack className="text-xs font-medium leading-5">
                    <MapPin size={50} strokeWidth={1} />
                    <p className="pt-1">
                      Our customers uses this method at last moment of pick-up.
                    </p>
                  </HStack>
                </Label>
              </div>
            </RadioGroup>
          </HStack>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Text styles={"large"}>Destination Address</Text>

        <ScrollArea className="h-full w-screen rounded-md ">
          <HStack className="w-full">
            <Dialog>
              <DialogTrigger>
                <div className="flex h-28 w-96 items-center gap-4  rounded-lg border-2 border-dashed border-primary/30 px-3">
                  <CirclePlus size={40} strokeWidth={1} />
                  <VStack className="">
                    <Text styles={"p_ui_medium"}>Add New Address</Text>
                    <Text styles={"details"}>
                      This Address will save for further uses also.
                    </Text>
                  </VStack>
                </div>
              </DialogTrigger>

              <DialogContent className="">
                <DialogHeader>
                  <Text styles={"large"} className="text-start">
                    Add New Address
                  </Text>
                </DialogHeader>

                <Label>Address</Label>
                <Input />
                <HStack className="justify-end">
                  <Button variant={"outline"}>Discard</Button>
                  <Button>Save</Button>
                </HStack>
              </DialogContent>
            </Dialog>

            <RadioGroup className="flex  ">
              <div className="flex h-28 w-96  items-center justify-center gap-3 rounded-lg border-2 px-4">
                <RadioGroupItem
                  value="option-five"
                  className="border-2"
                  id="option-five"
                />
                <Label
                  htmlFor="option-five"
                  className="flex flex-col gap-1 py-2"
                >
                  <h1 className="text-base font-medium leading-6">Block A</h1>
                  <HStack className="text-xs font-medium leading-5">
                    <MapPin size={50} strokeWidth={1} />
                    <p className="pt-1">
                      Our customers uses this method at last moment of pick-up.
                    </p>
                  </HStack>
                </Label>
              </div>
              <div className="flex h-28 w-96  items-center justify-center gap-3 rounded-lg border-2 px-4">
                <RadioGroupItem
                  value="option-six"
                  className="border-2"
                  id="option-six"
                />
                <Label
                  htmlFor="option-six"
                  className="flex flex-col gap-1 py-2"
                >
                  <h1 className="text-base font-medium leading-6">Block B</h1>
                  <HStack className="text-xs font-medium leading-5">
                    <MapPin size={50} strokeWidth={1} />
                    <p className="pt-1">
                      Our customers uses this method at last moment of pick-up.
                    </p>
                  </HStack>
                </Label>
              </div>
            </RadioGroup>
          </HStack>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </VStack>
      <HStack className="justify-end">
        <Button variant={"outline"}>Previous</Button>
        <Button>Continue</Button>
      </HStack>
    </div>
  );
}
