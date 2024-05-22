import React from "react";

import { cn } from "../lib/utils";
import { Text } from "./text";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Header = ({ children, className, ...props }: HeaderProps) => {
  return (
    <div
      {...props}
      className={cn(
        "h-15 z-30 flex w-full items-center justify-between bg-background px-10 py-4 text-lg font-semibold backdrop-blur-lg",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface HeaderTitleProps extends React.ComponentProps<typeof Text> {}

export const HeaderTitle = ({
  children,
  className,
  ...props
}: HeaderTitleProps) => {
  return (
    <Text
      styles={"body_medium"}
      className={cn("font-medium", className)}
      {...props}
    >
      {children}
    </Text>
  );
};

interface HeaderRightProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeaderRight = ({
  children,
  className,
  ...props
}: HeaderRightProps) => {
  return (
    <div className={cn("ml-auto", className)} {...props}>
      {children}
    </div>
  );
};
