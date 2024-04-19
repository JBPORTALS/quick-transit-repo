import React from "react";

import { Header, HeaderTitle } from "@qt/ui/header";
import { VStack } from "@qt/ui/stack";

import HeaderClient from "~/app/_components/headerClient";

export default function PackageDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <HeaderClient />
      <VStack className="h-full max-h-fit w-full p-5">{children}</VStack>
    </div>
  );
}
