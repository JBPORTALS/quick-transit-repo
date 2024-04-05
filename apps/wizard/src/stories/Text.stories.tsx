import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Text } from "@qt/ui/text";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Text",
  component: Text,
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
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const h1: Story = {
  args: {
    styles: "h1",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const h2: Story = {
  args: {
    styles: "h2",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const h3: Story = {
  args: {
    styles: "h3",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const h4: Story = {
  args: {
    styles: "h4",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const large: Story = {
  args: {
    styles: "large",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const lead: Story = {
  args: {
    styles: "lead",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const p: Story = {
  args: {
    styles: "p",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const p_ui: Story = {
  args: {
    styles: "p_ui",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const p_ui_medium: Story = {
  args: {
    styles: "p_ui_medium",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};
export const list: Story = {
  args: {
    styles: "list",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const body: Story = {
  args: {
    styles: "body",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const body_medium: Story = {
  args: {
    styles: "body_medium",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};
export const subtle: Story = {
  args: {
    styles: "subtle",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const subtle_medium: Story = {
  args: {
    styles: "subtle_medium",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const subtle_semibold: Story = {
  args: {
    styles: "subtle_semibold",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};
export const small: Story = {
  args: {
    styles: "small",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const details: Story = {
  args: {
    styles: "details",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const blockquote: Story = {
  args: {
    styles: "blockquote",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};
export const inline_code: Story = {
  args: {
    styles: "inline_code",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const table_head: Story = {
  args: {
    styles: "table_head",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};

export const table_item: Story = {
  args: {
    styles: "table_item",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta adipisci placeat veritatis laborum dolores eum perferendis commodi sapiente sunt inventore quod fuga, reprehenderit esse similique porro maiores? Tempora, nostrum excepturi?",
  },
};
