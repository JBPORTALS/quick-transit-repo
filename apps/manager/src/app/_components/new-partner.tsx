"use client";

import React from "react";
import { User2Icon } from "lucide-react";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Button } from "@qt/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@qt/ui/dialog";
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
import { Label } from "@qt/ui/label";
import { toast } from "@qt/ui/toast";

import { api } from "~/trpc/react";
import { createClient } from "~/utils/client";

const createPartnerSchema = z.object({
  fullName: z.string().trim().min(1, "Required"),
  email: z.string().trim().email().min(1, "Required"),
});

export default function NewPartner({
  children,
}: {
  children: React.ReactNode;
}) {
  const form = useForm({
    schema: createPartnerSchema,
  });
  const [avatarFile, setAvatarFile] = React.useState<File | undefined | null>(
    null,
  );

  const [opened, setOpened] = React.useState(false);
  const utils = api.useUtils();

  const { mutateAsync: createUser } = api.auth.createUser.useMutation({
    async onSuccess(data, variables, context) {
      toast.success("Partner added successfully");
      await utils.auth.getPartners.invalidate();
      form.reset();
      setAvatarFile(null);
      setOpened(false);
    },
    onError(error, variables, context) {
      toast.error("Unable to add partner, try again later", {
        description: error.message,
      });
    },
  });

  function getPreviewUrl() {
    if (!avatarFile) return undefined;
    return URL.createObjectURL(avatarFile);
  }

  async function onSubmit(values: z.infer<typeof createPartnerSchema>) {
    let fullPath;
    if (avatarFile) {
      const supabase = createClient();
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload("/partners", avatarFile);
      if (error) console.log(error);

      fullPath = data?.fullPath;
    }

    await createUser({
      email: values.email,
      name: values.fullName,
      picture: fullPath,
      role: "partner",
    });
  }
  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Partner</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-16">
                <AvatarImage src={getPreviewUrl()} />
                <AvatarFallback className="bg-primary/20">
                  <User2Icon className="size-6 fill-primary text-transparent " />
                </AvatarFallback>
              </Avatar>

              <Label htmlFor="avatar">
                <Input
                  type="file"
                  name="avatar"
                  onChange={(e) => {
                    setAvatarFile(e.target.files![0]);
                  }}
                />
              </Label>
            </div>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon Doe" {...field} />
                  </FormControl>
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
                    <Input {...field} placeholder="jhon@gmail.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button isLoading={form.formState.isSubmitting}>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
