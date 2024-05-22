"use client";

import type { Decorator, Preview } from "@storybook/react";
import React from "react";

import "../src/app/globals.css";

const withPoppinsFont: Decorator = (Story) => (
  <main className={"font-poppins "}>
    {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
    <Story />
  </main>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withPoppinsFont],
};

export default preview;
