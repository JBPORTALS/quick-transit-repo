"use client";

import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@qt/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@qt/ui/form";
import { Input } from "@qt/ui/input";
import { HStack, VStack } from "@qt/ui/stack";
import { CreateUserSchema } from "@qt/validators";

export default function Page() {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof CreateUserSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-background">
      <Link href={"/"}>
        <HStack className="items-center rounded-full border-2 px-5 py-2 shadow-sm">
          <Image
            src={"/qt-logo.png"}
            width={32}
            height={32}
            alt="Quick Transitt Logo"
          />
          <span className="text-lg">Quick Transitt</span>
        </HStack>
      </Link>
      <VStack className="w-fit items-center gap-1">
        <h1 className="text-2xl font-bold text-secondary-foreground">
          Create Account
        </h1>
        <h4 className="w-4/5 text-center text-muted-foreground">
          Create an account to experience fast & quick deliveries.
        </h4>
      </VStack>
      <VStack className="w-1/5 flex-col items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col space-y-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button size={"lg"}>Create</Button>
          </form>
        </Form>
        <Button size={"lg"} variant={"link"}>
          <Link href={"/sign-in"}>{"Already have an account?"}</Link>
        </Button>
      </VStack>
    </main>
  );
}
