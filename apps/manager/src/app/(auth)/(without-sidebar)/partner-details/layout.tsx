import React from "react";
import { VStack } from "@qt/ui/stack";


export default function PackageDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <VStack className="w-full ">{children}</VStack>
    </div>
  );
}