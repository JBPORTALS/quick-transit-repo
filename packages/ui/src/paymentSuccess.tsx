import React from "react";
import { Bike, CircleCheck } from "lucide-react";

import { Button } from "./button";
import { VStack } from "./stack";
import { Text } from "./text";

export default function PaymentSuccess() {
  return (
    <div className="h-screen p-5">
      <VStack className="bg-green-50items-center h-screen justify-center gap-6 rounded-sm border-inherit ">
        <VStack className=" items-center justify-center">
          <CircleCheck className="size-32" color="#1eb352" strokeWidth={0.5} />
          <Text styles={"large"}>Your Pick-Up request placed Successfully</Text>
          <Text styles={"p_ui_medium"}>Request ID-#12435267725252727</Text>
        </VStack>
        <VStack className=" items-center justify-center gap-14">
          <VStack className=" items-center justify-center">
            <Text styles={"body"}>
              Our Pick-Up Partner will arrive soon to collect your Package.
            </Text>
            <Bike className="size-16" strokeWidth={1.5} />
          </VStack>
          <Button variant={"outline"}>Track Your Package</Button>
        </VStack>
      </VStack>
    </div>
  );
}
