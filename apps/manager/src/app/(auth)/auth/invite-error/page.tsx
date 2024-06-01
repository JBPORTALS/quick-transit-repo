import React from "react";
import Link from "next/link";
import { Link2OffIcon, MailWarningIcon } from "lucide-react";

import { Button } from "@qt/ui/button";
import { VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export default function Page() {
  return (
    <VStack className="h-full items-center justify-center">
      <MailWarningIcon className="size-32 text-primary/50" />
      <Text styles={"h4"}>Invitation Link is invalid or Expired</Text>
      <Text className="w-1/4 text-wrap text-center  text-accent-foreground/60">
        Your link has been expired or invalid. Please contact support team for
        verification of link.
      </Text>
      <Button asChild size={"lg"}>
        <Link replace href={"/"}>
          Go To Home
        </Link>
      </Button>
    </VStack>
  );
}
