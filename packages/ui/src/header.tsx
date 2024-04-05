import React from "react";
import { BellRing } from "lucide-react";

import { cn } from "../lib/utils";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Header = ({ children, className, ...props }: HeaderProps) => {
  return (
    <div
      className={cn(
        "h-15 flex w-full items-center justify-between border-b bg-background px-10 py-3 text-lg font-semibold",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface HeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeaderTitle = ({
  children,
  className,
  ...props
}: HeaderTitleProps) => {
  return (
    <h2 className={cn("font-bold", className)} {...props}>
      {children}
    </h2>
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
