"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bike,
  BoxIcon,
  LayoutDashboardIcon,
  Truck,
  UsersIcon,
  Wallet,
} from "lucide-react";

import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import NavItem, { NavItemProps } from "./nav-item";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
export default function Sidebar({
  children,
  className,
  ...props
}: SidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full w-60 flex-col justify-between gap-6 px-3 py-8",
        className,
      )}
    >
      <header className="flex justify-center">
        <h1 className="text-lg font-bold text-primary">Quick Transit</h1>
      </header>
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
    <div className={cn("flex h-full flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
};

interface SidebarItemProps extends NavItemProps {}

export const SidebarItem = (props: SidebarItemProps) => <NavItem {...props} />;
