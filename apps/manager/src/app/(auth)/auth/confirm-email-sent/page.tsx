"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { MailCheckIcon } from "lucide-react";
import { z } from "zod";

import { Button } from "@qt/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@qt/ui/form";
import { Input } from "@qt/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@qt/ui/input-otp";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";
import { verifyFormSchema } from "@qt/validators";

import { verifyOTP } from "~/utils/actions/auth";

const MailCheckIconWithMotion = motion(MailCheckIcon);
export default function Page() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const form = useForm({
    schema: verifyFormSchema,
    mode: "onChange",
    defaultValues: {
      email: email ?? "",
    },
  });

  if (!email) router.replace("/sign-in");

  async function onSubmit(values: z.infer<typeof verifyFormSchema>) {
    const { error } = await verifyOTP(values);
    if (error)
      form.setError("global_error", {
        message: error,
      });
  }

  return (
    <VStack className="h-full items-center justify-center">
      {/* <Button asChild size={"lg"}>
        <Link replace href={"/sign-in"}>
          Resend Email
        </Link>
      </Button> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[380px] flex-col items-center space-y-4 px-10 py-14"
        >
          <VStack className="w-full items-center gap-2">
            <HStack className="items-center gap-0 rounded-full border px-5 py-1">
              <Image
                src={"/qt-logo.png"}
                width={28}
                height={28}
                alt="Quick Transitt Logo"
              />
              <span className="font-acme font-semibold text-accent-foreground/70">
                QT <span className="text-xs text-primary">●</span> Console
              </span>
            </HStack>
            <Text styles={"h3"}>Verification</Text>
          </VStack>
          <FormField
            name="global_error"
            control={form.control}
            render={() => (
              <FormItem className="w-full text-center">
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="otp"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full items-center text-center">
                <FormLabel>6 digit OTP</FormLabel>
                <FormControl className="w-full">
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="mx-auto">
                      <InputOTPSlot className="size-11" index={0} />
                      <InputOTPSlot className="size-11" index={1} />
                      <InputOTPSlot className="size-11" index={2} />
                      <InputOTPSlot className="size-11" index={3} />
                      <InputOTPSlot className="size-11" index={4} />
                      <InputOTPSlot className="size-11" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
                <FormDescription className="w-full px-0 text-center leading-3">
                  Confirmation mail has been sent to {email}{" "}
                  <Button asChild size={"sm"} className="p-0" variant={"link"}>
                    <Link replace href={"/sign-in"}>
                      Edit email
                    </Link>
                  </Button>
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem hidden className="w-full">
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <pre>{JSON.stringify(form.formState.errors)}</pre> */}

          <Button
            disabled={form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
            size={"lg"}
            className="w-full"
          >
            Verify
          </Button>
        </form>
      </Form>
    </VStack>
  );
}
