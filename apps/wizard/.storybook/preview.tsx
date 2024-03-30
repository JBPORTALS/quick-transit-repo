import type { Decorator, Preview } from "@storybook/react";
import React from "react";

import "../src/app/globals.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const withPoppinsFont: Decorator = (Story) => (
  <div className={poppins.className}>
    {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
    <Story />
  </div>
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
