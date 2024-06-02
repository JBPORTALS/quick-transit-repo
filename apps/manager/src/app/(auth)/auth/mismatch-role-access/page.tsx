import React from "react";
import Link from "next/link";
import { LockKeyhole, MailWarningIcon } from "lucide-react";

import { Button } from "@qt/ui/button";
import { VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export default function Page() {
  return (
    <VStack className="h-full items-center justify-center">
      <LockKeyhole className="size-32 text-primary/50" />
      <Text styles={"h4"}>Mismatched Role Access</Text>
      <Text className="w-1/4 text-wrap text-center  text-accent-foreground/60">
        Your unauthorize for this portal access. Your trying access this portal
        with diffrent role and that is not allowed.
      </Text>
      <Button asChild size={"lg"}>
        <Link replace href={"/"}>
          Go To Home
        </Link>
      </Button>
    </VStack>
  );
}
