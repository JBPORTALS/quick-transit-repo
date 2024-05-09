import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@qt/ui/button";
import { HStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export default function Page() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-5 bg-background">
      <HStack className="items-center rounded-full border-2 px-5 py-2 shadow-sm">
        <Image
          src={"/qt-logo.png"}
          width={32}
          height={32}
          alt="Quick Transitt Logo"
        />
        <span className="text-lg">Quick Transitt</span>
      </HStack>
      <Text styles={"h1"} className="w-1/2 text-center">
        Your Fast and Reliable Package Transfer Solution
      </Text>
      <Text styles={"lead"} className="w-1/2 text-center text-muted-foreground">
        Effortlessly manage package transportation between customers and
        transport agencies with our user-friendly app.
      </Text>
      <HStack>
        <Button size={"lg"}>
          <Link href={"/dashboard"}>Get Started</Link>
        </Button>
        <Button asChild size={"lg"} variant={"outline"}>
          <Link href={"/sign-in"}>Signin</Link>
        </Button>
      </HStack>
    </main>
  );
}
