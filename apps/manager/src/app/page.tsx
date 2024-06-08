import Image from "next/image";
import Link from "next/link";
import { LayoutDashboardIcon } from "lucide-react";

import { Button } from "@qt/ui/button";
import { HStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { api } from "~/trpc/server";

export default async function Page() {
  const user = await api.auth.getUser();

  return (
    <main className="flex h-full flex-col items-center justify-center gap-5 bg-background">
      <HStack className="items-center gap-0 rounded-full border px-5 py-2">
        <Image
          src={"/qt-logo.png"}
          width={28}
          height={28}
          alt="Quick Transitt Logo"
        />
        <span className="font-acme text-lg font-semibold text-accent-foreground/70">
          QT <span className="text-xs text-primary">●</span> Console
        </span>
      </HStack>
      <Text styles={"h1"} className="w-1/2 text-center">
        Quick Transit Manager Portal
      </Text>
      <Text
        styles={"h4"}
        className="w-1/2 text-center font-normal text-muted-foreground"
      >
        Efficiently Manage and Streamline Your Package Transportation Requests
        and Delivery Processes with Ease
      </Text>
      <HStack>
        {user ? (
          <Button size={"lg"} asChild>
            <Link href={"/dashboard"}>
              <LayoutDashboardIcon />
              Continue to Dashboard
            </Link>
          </Button>
        ) : (
          <Button size={"lg"} asChild>
            <Link href={"/sign-in"}>Signin</Link>
          </Button>
        )}
      </HStack>
    </main>
  );
}
