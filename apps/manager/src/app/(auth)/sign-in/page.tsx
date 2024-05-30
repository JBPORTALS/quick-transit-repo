"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { createClient } from "~/utils/client";

const signInFormSchema = z.object({
  email: z
    .string({ required_error: "This field is required" })
    .email("Not a valid email")
    .min(1, "Not a valid email"),
  // otp: z.string({ required_error: "OTP is required" }).min(6).max(6),
});

export default function page() {
  const form = useForm({
    schema: signInFormSchema,
  });
  const supabase = createClient();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) console.log(error);
    // if (data) router.push("/auth/callback");
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
            <Text styles={"h4"}>Confirm Your Email</Text>
            <Text styles={"details"} className="text-muted-foreground">
              to get an verification token
            </Text>
          </VStack>
          <FormField
            name="email"
            disabled={form.formState.isLoading}
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  You will get an OTP to this email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            name="otp"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{"Verification Token (OTP)"}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Open your email inbox to get six digit code.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button
            disabled={form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
            size={"lg"}
            className="w-full"
          >
            Continue
          </Button>
        </form>
      </Form>
    </VStack>
  );
}
