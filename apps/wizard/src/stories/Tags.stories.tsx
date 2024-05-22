import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Tags } from "@qt/ui/tags";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Tag",
  component: Tags,
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
} satisfies Meta<typeof Tags>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Pending: Story = {
  args: {
    variant: "pending",
    children: "Shipping",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Delivered",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Canceled",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Canceled",
  },
};

