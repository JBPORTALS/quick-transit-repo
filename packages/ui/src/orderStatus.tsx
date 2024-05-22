import React from "react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import {
  BoxSelect,
  Calendar,
  CalendarCheck,
  CalendarDays,
  CheckCheck,
  PackageCheck,
  PhoneCall,
  StarHalfIcon,
  Truck,
  TruckIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Text } from "./text";

export default function OrderStatus() {
  return (
    <div className="h-full w-full rounded-md border ">
      <div>
        <div className="flex gap-3 p-5 ">
          <div className="m-3 h-14 w-20 border text-center  ">BOX</div>
          <div>
            <Text styles={"subtle_semibold"}>Question Paper (Bundle A)</Text>
            <div className="flex gap-3">
              <Text styles={"details"}>23x10x10</Text>
              <Text styles={"details"}>2Kg</Text>
            </div>
            <div className="flex gap-1 text-muted-foreground ">
              <CalendarDays />
              <Text styles={"details"}> Requested December 2021</Text>
            </div>
          </div>
        </div>
        <div className="flex px-8">
          <div className="w-12 rounded-full border bg-primary p-3 ">
            <PackageCheck color="#ffffff" />
          </div>
          <div className="pt-1 text-primary">__________</div>
          <div className="w-12 rounded-full border bg-primary/50 p-3 ">
            <Truck color="#a83287" />
          </div>
          <div className="pt-1">__________</div>
          <div className="w-12 rounded-full border bg-gray-400 p-3 ">
            <CheckCheck color="#ffffff" />
          </div>
        </div>
      </div>
      <div className=" flex gap-3 p-5">
        <Avatar className="mt-3 h-16 w-16">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Rohith Varma</h1>
          <div className="flex gap-2 text-sm text-muted-foreground">
            <PhoneCall size={16} /> +91 8764567865
          </div>
          <div className="flex">
            <StarFilledIcon color="#eff226" />
            <StarFilledIcon color="#eff226" />
            <StarFilledIcon color="#eff226" />
            <StarFilledIcon color="#eff226" />
          </div>
        </div>
        <div className="ml-10 mt-5">
          <Button>Review</Button>
        </div>
      </div>
    </div>
  );
}
