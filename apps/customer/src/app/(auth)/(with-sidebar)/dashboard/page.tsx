import { CalendarDays } from "lucide-react";

import Requests, {
  RequestBody,
  RequestButton,
  RequestImage,
  RequestLabel,
  RequestTimeLabel,
  RequestWeightLabel,
} from "@qt/ui/request";
import Rightbar from "@qt/ui/rightbar";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export default function page() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2 flex-1  rounded-radius border bg-card p-6 py-6 shadow-sm  dark:bg-secondary">
        <Text styles={"large"} className=" text-secondary-foreground ">
          Your Recent Requests
        </Text>
        <div className="py-6">
          <div className="py-3.5">
            <Requests variant={"default"} className=" border">
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
            <Requests variant={"default"} className=" border">
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

          <div className=" py-3.5">
            <Requests variant={"default"} className=" border">
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
      <Rightbar />
    </div>
  );
}
