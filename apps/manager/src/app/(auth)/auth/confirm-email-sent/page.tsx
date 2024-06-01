"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MailCheckIcon } from "lucide-react";

import { Button } from "@qt/ui/button";
import { VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

const MailCheckIconWithMotion = motion(MailCheckIcon);
export default function Page() {
  return (
    <VStack className="h-full items-center justify-center">
      <MailCheckIconWithMotion
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.1, ease: "linear" }}
        className="size-32 text-green-500/70"
      />
      <Text styles={"h4"}>Confirmation Mail Sent Successfully</Text>
      <Text
        styles={"subtle"}
        className="w-1/4 text-wrap text-center  text-accent-foreground/60"
      >
        Confirmation mail has been sent your E-mail, check your email. If you
        couldn't find an email or facing any trouble, please contact support
        team or send the email once.
      </Text>
      <Button asChild size={"lg"}>
        <Link replace href={"/sign-in"}>
          Resend Email
        </Link>
      </Button>
    </VStack>
  );
}
