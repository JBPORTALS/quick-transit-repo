import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import PackageForm from "@qt/ui/packageForm";
import ImageUploader from "@qt/ui/imagePlaceholder";
import { HStack, VStack } from "@qt/ui/stack";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/NewPackageForm",
  component: () => (
    <VStack className="gap-10  " >
      <HStack>
        <ImageUploader />
        <ImageUploader />
        <ImageUploader />
      </HStack>
      <PackageForm  />
    </VStack>

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
} satisfies Meta<typeof PackageForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};

