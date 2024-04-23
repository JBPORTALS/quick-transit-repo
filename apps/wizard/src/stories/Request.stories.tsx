import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { CalendarDays } from "lucide-react";

import { Button } from "@qt/ui/button";
import Requests, {
  RequestBody,
  RequestButton,
  RequestImage,
  RequestLabel,
  RequestTimeLabel,
  RequestWeightLabel,
} from "@qt/ui/request";
import { HStack, VStack } from "@qt/ui/stack";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Request",
  component: (props) => (
    <Requests {...props}>
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
            <CalendarDays height={16} width={16} className="mr-1" /> Requested 5
            hours ago...
          </RequestTimeLabel>
        </VStack>
      </RequestBody>
      <RequestButton />
    </Requests>
  ),
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   variant: "default"
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Requests>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Vertical: Story = {
  args: {
    variant: "vertical",
  },
};
