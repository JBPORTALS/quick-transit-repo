import React, { useState } from "react";
import { Download, Edit, EllipsisVertical, Package, X } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@qt/ui/carousel";

import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader } from "./dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { HStack, VStack } from "./stack";
import { Tags } from "./tags";
import { Text } from "./text";

export default function PackageDetails() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false); // State for Assign Pick-up Partner dialog

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleOpenAssignDialog = () => {
    setIsAssignDialogOpen(true);
  };
  return (
    <HStack>
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
          <Text styles={"details"} className="text-muted-foreground">
            #12435267725252727
          </Text>
          <Text styles={"p_ui_medium"}>DSIT Questions Papers (Bundle A)</Text>
          <HStack>
            <Tags variant={"primary"}>78x23x120 cm</Tags>
            <Tags variant={"primary"}>200 g</Tags>
          </HStack>
          <Text styles={"body_medium"}>Pick-up Address</Text>
          <Text styles={"subtle"}>
            #678, Magadi Road, Chintamani, Banglore 512 076
          </Text>
          <Text styles={"body_medium"}>Received Franchise Address</Text>
          <Text styles={"subtle"}>
            #123, 2nd Main Road, MG Road, Banglore 512 076
          </Text>
          <Text styles={"body_medium"}>Destination Address</Text>
          <Text styles={"subtle"}>
            #123, 2nd Main Road, MG Road, Banglore 512 076
          </Text>
          <HStack>
            <Text styles={"body_medium"}>Amount Charged -</Text>
            <Text styles={"large"}>₹800</Text>
          </HStack>
        </VStack>
      </HStack>

      <VStack className="gap-8 border-l px-5">
        <VStack>
          <Text styles={"details"}>Service Invoice</Text>
          <HStack className="h-36 w-52 items-end rounded-lg  border">
            <VStack className="h-11 w-full items-end border bg-transparent/5  bg-white ">
              <button className="m-1 mr-2  rounded-lg border bg-white p-1">
                <Download />
              </button>
            </VStack>
          </HStack>
        </VStack>
        <VStack className="gap-1">
          <Text styles={"subtle_medium"}>Delivered Package Details</Text>
          <Text styles={"details"}>Package Tracking ID</Text>
          <Text styles={"details"} className="text-muted-foreground">
            #3787292376262638827
          </Text>

          <VStack className="pt-5">
            <Text styles={"details"}>Image Of Reciept</Text>
            <HStack className="h-36 w-52 items-end rounded-lg  border">
              <VStack className="h-11 w-full items-end border bg-transparent/5  bg-white ">
                <button className="m-1 mr-2  rounded-lg border bg-white p-1">
                  <Download />
                </button>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </VStack>

      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <div
            className="h-10 rounded-lg border p-2"
            onClick={handleToggleDropdown}
          >
            <EllipsisVertical size={20} color="#000000" />{" "}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mx-5">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Text styles={"subtle_medium"}>
              {" "}
              <HStack>
                <Edit /> Edit Package
              </HStack>
            </Text>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenAssignDialog}>
            <Text styles={"subtle_medium"} className="text-red-500">
              <HStack>
                {" "}
                <Package />
                Cancel Request
              </HStack>
            </Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="">
          <DialogHeader>
            <Text styles={"large"} className="text-start">
              Are you sure want to cancel the request?
            </Text>
          </DialogHeader>

          <Text styles={"subtle"} className="text-start text-muted-foreground">
            This action cannot be undone. This will permanently cancel your
            request.
          </Text>
          <HStack className="justify-end">
            <Button variant={"outline"}>Cancel</Button>
            <Button variant={"destructive"}>Cancel Request</Button>
          </HStack>
        </DialogContent>
      </Dialog>
    </HStack>
  );
}
