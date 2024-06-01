import React from "react";
import Link from "next/link";
import { FrownIcon, Link2OffIcon, MailWarningIcon } from "lucide-react";

import { Button } from "@qt/ui/button";
import { VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export default function Page() {
  return (
    <VStack className="h-full items-center justify-center">
      <FrownIcon className="size-32 text-primary/60" />
      <Text styles={"h4"}>404 - Not Found</Text>
      <Text className="w-1/4 text-wrap text-center  text-accent-foreground/60">
        The page you are looking for does not exist. Try to refresh the page or
        contact support team.
      </Text>
      <Button asChild size={"lg"}>
        <Link replace href={"/dashboard"}>
          Go To Home
        </Link>
      </Button>
    </VStack>
  );
}
