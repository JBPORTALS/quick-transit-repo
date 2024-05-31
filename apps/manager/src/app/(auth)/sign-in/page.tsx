"use client";

import Image from "next/image";
import { z } from "zod";

import { Button } from "@qt/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@qt/ui/form";
import { Input } from "@qt/ui/input";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";
import { signInFormSchema } from "@qt/validators";

import { SigninWithPassword } from "~/utils/actions/auth";

export default function page() {
  const form = useForm({
    schema: signInFormSchema,
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    try {
      await SigninWithPassword(values);
    } catch (e) {
      const error = e as Error;
      form.setError("global_error", {
        message: error.message,
      });
    }
  }

  return (
    <VStack className="h-full items-center overflow-y-auto bg-secondary pt-28 dark:bg-background">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[380px] flex-col items-center space-y-4 rounded-radius border bg-card px-10 py-14 shadow-sm"
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
            <Text styles={"h3"}>Signin to continue</Text>
            <Text styles={"list"} className="text-muted-foreground">
              to get latest updates on packages
            </Text>
          </VStack>
          <FormField
            name="global_error"
            disabled={form.formState.isSubmitting}
            control={form.control}
            render={() => (
              <FormItem className="w-full text-center">
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            disabled={form.formState.isSubmitting}
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            disabled={form.formState.isSubmitting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="password">{"Password"}</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
            size={"lg"}
            className="w-full"
          >
            Submit
          </Button>
        </form>
      </Form>
    </VStack>
  );
}
