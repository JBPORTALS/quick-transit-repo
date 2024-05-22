"use client";

import { cn } from "../lib/utils";
import NavItem, { NavItemProps } from "./nav-item";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  iconItem: React.ReactNode;
}
export default function Sidebar({
  children,
  className,
  iconItem,
  ...props
}: SidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full w-52 flex-col justify-between gap-6 bg-background",
        className,
      )}
    >
      <header className="flex justify-center py-5">{iconItem}</header>
      {children}
    </div>
  );
}

interface SidebarLabelProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const SidebarLabel = ({
  children,
  className,
  ...props
}: SidebarLabelProps) => {
  return (
    <h2
      className={cn("text-center text-lg font-semibold", className)}
      {...props}
    >
      {children}
    </h2>
  );
};

interface SidebarBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarBody = ({
  children,
  className,
  ...props
}: SidebarBodyProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col gap-2 overflow-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface SidebarBottomContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarBottomContent = ({
  children,
  className,
  ...props
}: SidebarBottomContentProps) => {
  return (
    <div
      className={cn("flex h-fit w-full flex-col gap-8 p-3", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface SidebarItemProps extends NavItemProps {}

export const SidebarItem = (props: SidebarItemProps) => <NavItem {...props} />;
