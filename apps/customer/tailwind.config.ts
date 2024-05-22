import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@qt/tailwind-config/web";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [...baseConfig.content, "../../packages/ui/**/*.{ts,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-opensans)", ...fontFamily.sans],
        mono: ["var(--font-opensans)", ...fontFamily.mono],
        acme: ["var(--font-acme)"],
      },
    },
  },
} satisfies Config;
