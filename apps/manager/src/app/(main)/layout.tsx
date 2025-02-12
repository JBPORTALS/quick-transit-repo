"use client";

import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

import { VStack } from "@qt/ui/stack";

import Subheader from "~/app/_components/subheader";
import HeaderClient from "../_components/headerClient";

export default function RootLayout(props: {
  children: React.ReactNode;
  subheader: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="relative h-full w-full gap-0">
      <NextTopLoader
        showSpinner={false}
        color="linear-gradient(to right, rgb(107, 33, 168), rgb(76, 29, 149), rgb(107, 33, 168))"
      />
      <div className="col-span-5">
        <VStack className="relative gap-0 border-b">
          <HeaderClient />
          {/* if these paths are isn't include in the pathname, then show the sub header. */}
          {!["/package-details", "/partners/v"]
            .map((value) => pathname.startsWith(value))
            .includes(true) && <Subheader />}
        </VStack>
        <div className="flex flex-col px-44 py-6">{props.children}</div>
      </div>
    </div>
  );
}
