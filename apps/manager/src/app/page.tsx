import { BoxIcon, LayoutDashboardIcon, UsersIcon } from "lucide-react";

import NavItem from "@qt/ui/nav-item";

import { api } from "~/trpc/server";

export default async function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  const posts = api.post.all();

  return (
    <main className="container flex h-screen flex-col gap-3 py-16">
      <NavItem isActive>
        <LayoutDashboardIcon className="mr-2" /> Dashboard
      </NavItem>
      <NavItem>
        <BoxIcon className="mr-2" /> Packages
      </NavItem>
      <NavItem>
        <UsersIcon className="mr-2" /> Customers
      </NavItem>
    </main>
  );
}
