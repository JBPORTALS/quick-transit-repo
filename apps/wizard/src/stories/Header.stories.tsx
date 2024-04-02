import type { Meta, StoryObj } from "@storybook/react";
import { BellIcon } from "lucide-react";

import { Button } from "@qt/ui/button";
import { Header, HeaderRight, HeaderTitle } from "@qt/ui/header";

const meta = {
  title: "UI/Header",
  component: () => (
    <Header className="w-[900px]">
      <HeaderTitle>Dashboard</HeaderTitle>
      <HeaderRight>
        <Button variant={"outline"} className="rounded-full" size={"icon"}>
          <BellIcon className="h-5 w-5" />
        </Button>
      </HeaderRight>
    </Header>
  ),
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};
