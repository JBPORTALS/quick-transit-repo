"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  CheckCircle2,
  CheckIcon,
  Loader,
  LoaderCircleIcon,
  MailWarningIcon,
  User2Icon,
} from "lucide-react";
import { z } from "zod";

import { RouterOutputs } from "@qt/api";
import { cn } from "@qt/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@qt/ui/bread-crumbs";
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

import { api } from "~/trpc/react";

const createPartnerSchema = z.object({
  fullName: z.string().trim().min(1, "Required"),
  email: z.string().trim().email().min(1, "Required"),
});

export function PartnerDetails({
  initialData,
}: {
  initialData: RouterOutputs["auth"]["getUserById"];
}) {
  const form = useForm({
    schema: createPartnerSchema,
  });
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading } = api.auth.getUserById.useQuery(
    { id },
    { initialData },
  );

  const setFormDetails = React.useCallback(() => {
    form.reset({
      fullName: data.name ?? "",
      email: data.email,
    });
  }, [id]);

  React.useEffect(() => {
    setFormDetails();
  }, [id]);

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center py-10">
        <LoaderCircleIcon strokeWidth={1} className="size-10 animate-spin" />
      </div>
    );

  return (
    <Form {...form}>
      <form className="w-full space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Name as on the identity proof</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input readOnly type="email" {...field} />
              </FormControl>
              <FormDescription
                className={cn(
                  data.email_confirmed_at ? "text-green-600" : null,
                )}
              >
                {data.email_confirmed_at ? (
                  <span className="inline-flex items-center text-pretty">
                    <CheckCircle2 className="mr-1 size-3.5" />
                    <span>Verified</span>{" "}
                  </span>
                ) : (
                  <span className="inline-flex items-center text-pretty">
                    <MailWarningIcon className="mr-1 size-3.5" />
                    <span>Verification pending</span>{" "}
                  </span>
                )}
              </FormDescription>
            </FormItem>
          )}
        />
        <HStack>
          {form.formState.isDirty && (
            <Button variant={"secondary"} onClick={() => form.reset()}>
              Reset Changes
            </Button>
          )}
          <Button disabled={!form.formState.isDirty}>Update profile</Button>
        </HStack>
      </form>
    </Form>
  );
}
