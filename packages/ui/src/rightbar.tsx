import React from "react";
import { CalendarDays } from "lucide-react";

import OrderStatus from "./orderStatus";
import Requests, {
  RequestBody,
  RequestButton,
  RequestImage,
  RequestLabel,
  RequestTimeLabel,
  RequestWeightLabel,
} from "./request";
import { HStack, VStack } from "./stack";
import { Text } from "./text";

export default function Rightbar() {
  return (
    <div className="col-span-1 flex flex-col gap-2 rounded-md border bg-card px-6 pt-6 dark:bg-secondary">
      <div className=" flex flex-col  gap-2 border-b pb-2">
        <Text styles={"large"}>Ongoing Deliveries</Text>
        <Text styles={"small"}>Today</Text>
      </div>
      <div className="h-14 p-2"></div>
      <div>
        <div className="py-3.5">
          <Requests variant={"vertical"}>
            <RequestBody>
              <HStack className="py-[7px]">
                <RequestImage />
              </HStack>
              <VStack className="gap-1">
                <RequestLabel>Question Papers</RequestLabel>
                <HStack>
                  <RequestWeightLabel>25x20x25</RequestWeightLabel>
                  <RequestWeightLabel>2Kg</RequestWeightLabel>
                </HStack>
                <RequestTimeLabel>
                  <CalendarDays height={16} width={16} className="mr-1" />{" "}
                  Requested 5 hours ago...
                </RequestTimeLabel>
              </VStack>
            </RequestBody>
            <RequestButton />
          </Requests>
        </div>
        <div className="py-3.5">
          <Requests variant={"vertical"}>
            <RequestBody>
              <HStack className="py-[7px]">
                <RequestImage />
              </HStack>
              <VStack className="gap-1">
                <RequestLabel>Question Papers</RequestLabel>
                <HStack>
                  <RequestWeightLabel>25x20x25</RequestWeightLabel>
                  <RequestWeightLabel>2Kg</RequestWeightLabel>
                </HStack>
                <RequestTimeLabel>
                  <CalendarDays height={16} width={16} className="mr-1" />{" "}
                  Requested 5 hours ago...
                </RequestTimeLabel>
              </VStack>
            </RequestBody>
            <RequestButton />
          </Requests>
        </div>
        <div className="py-3.5">
          <Requests variant={"vertical"}>
            <RequestBody>
              <HStack className="py-[7px]">
                <RequestImage />
              </HStack>
              <VStack className="gap-1">
                <RequestLabel>Question Papers</RequestLabel>
                <HStack>
                  <RequestWeightLabel>25x20x25</RequestWeightLabel>
                  <RequestWeightLabel>2Kg</RequestWeightLabel>
                </HStack>
                <RequestTimeLabel>
                  <CalendarDays height={16} width={16} className="mr-1" />{" "}
                  Requested 5 hours ago...
                </RequestTimeLabel>
              </VStack>
            </RequestBody>
            <RequestButton />
          </Requests>
        </div>
      </div>
    </div>
  );
}
