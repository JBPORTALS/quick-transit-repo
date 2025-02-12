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
      fullName: data.name,
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
    <div className="w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={"/dashboard"}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={"/partners"}>Partners</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{data.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className=" w-1/2 py-10">
        <VStack>
          <HStack className="items-center">
            <Avatar className="size-28 border-2">
              <AvatarImage src={data.picture ?? ""} />
              <AvatarFallback className="bg-primary/20">
                <User2Icon className="size-16 fill-primary text-transparent " />
              </AvatarFallback>
            </Avatar>
            <HStack>
              {data.picture ? (
                <Button size={"sm"} variant={"secondary"}>
                  Change Picture
                </Button>
              ) : (
                <Button size={"sm"} variant={"secondary"}>
                  Upload Picture
                </Button>
              )}
              <Button
                size={"sm"}
                className="bg-destructive/30 text-destructive"
                variant={"destructive"}
              >
                Delete Profile
              </Button>
            </HStack>
          </HStack>
          <Form {...form}>
            <form className="w-full space-y-4">
              {form.formState.isDirty && (
                <HStack className="fixed bottom-10 w-96 items-center justify-between rounded-full border bg-card/50 px-5 py-2 backdrop-blur-md">
                  <span className="text-sm">Changes found</span>
                  <HStack>
                    <Button
                      variant={"secondary"}
                      size={"sm"}
                      onClick={() => form.reset()}
                      className="rounded-full"
                    >
                      Reset Changes
                    </Button>
                    <Button size={"sm"} className="rounded-full">
                      Save
                    </Button>
                  </HStack>
                </HStack>
              )}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full border-none bg-input hover:bg-input/30 focus-visible:bg-input/30"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Name as on the identity proof
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="border-none bg-input hover:bg-input/30 focus-visible:bg-input/30"
                        {...field}
                      />
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
            </form>
          </Form>
        </VStack>
      </div>
    </div>
  );
}
