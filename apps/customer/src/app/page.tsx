import Image from "next/image";
import Link from "next/link";
import { LayoutDashboardIcon } from "lucide-react";

import { Button } from "@qt/ui/button";
import { HStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { createClient } from "~/utils/server";
import AuthButton from "./_components/AuthButton";

export default async function Page() {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
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
      <Text
        styles={"h4"}
        className="w-1/2 text-center font-normal text-muted-foreground"
      >
        Effortlessly manage package transportation between customers and
        transport agencies with our user-friendly app.
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
          <AuthButton />
        )}
      </HStack>
    </main>
  );
}
