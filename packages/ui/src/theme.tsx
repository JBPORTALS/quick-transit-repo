"use client";

import * as React from "react";
import { MoonIcon } from "@radix-ui/react-icons";
import { ThemeProvider, useTheme } from "next-themes";

import { buttonVariants } from "./button";
import { HStack } from "./stack";
import { Switch } from "./switch";

function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <HStack
      className={buttonVariants({
        variant: "ghost",
        className:
          "w-full justify-between rounded-none py-6 text-sm font-light hover:cursor-pointer",
      })}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <HStack className="gap-2">
        <MoonIcon className="h-5 w-5" /> Dark Mode
      </HStack>
      <Switch id="theme-toggle" checked={theme == "dark" ? true : false} />
    </HStack>
  );
}

export { ThemeProvider, ThemeToggle };
