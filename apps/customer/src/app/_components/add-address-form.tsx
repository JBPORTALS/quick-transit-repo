"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PinIcon, PlusCircleIcon } from "lucide-react";
import { z } from "zod";

import { Button } from "@qt/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  FormMessage,
  useForm,
} from "@qt/ui/form";
import { Input } from "@qt/ui/input";
import { Label } from "@qt/ui/label";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";
import { Textarea } from "@qt/ui/textarea";

import { api } from "~/trpc/react";

export interface AddressCardProps {
  title: string;
  description: string;
  type: "pickup" | "franchise" | "delivery";
  editMode?: boolean;
}

interface AddressCardDialogProps extends AddressCardProps {
  children: React.ReactNode;
}
const addressFormSchema = z.object({
  street: z.string().trim().min(10, "Invalid address"),
  pincode: z
    .string()
    .trim()
    .min(6, "Invalid pincode")
    .max(6, "Invalid pincode")
    .refine((v) => parseInt(v) > 0, { message: "Invalid pin code" }),
  phone: z
    .string()
    .trim()
    .min(1, "Required")
    .max(10, "Invalid phone number")
    .min(10, "Invalid phone number")
    .refine((v) => parseInt(v) > 0, { message: "Invalid phone number" }),
});

//New address dialog box
export const AddressCardDialog = ({
  children,
  description,
  title,
  type,
}: AddressCardDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    schema: addressFormSchema,
    defaultValues: {},
    mode: "onChange",
  });

  const utils = api.useUtils();
  const addAddress = api.address.create.useMutation({
    onSuccess() {
      utils.address.getAllByType.invalidate();
      utils.address.getByUser.invalidate();
      setIsOpen(false);
      form.reset();
    },
  });

  async function onSubmit(values: z.infer<typeof addressFormSchema>) {
    await addAddress.mutateAsync({
      ...values,
      pincode: parseInt(values.pincode),
      type,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="phone" className="text-right">
                    Phone Number
                  </Label>
                  <FormControl>
                    <Input id="phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="street" className="text-right">
                    Street Address
                  </Label>
                  <FormControl>
                    <Textarea id="street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="pincode" className="text-right">
                    Pincode
                  </Label>
                  <FormControl>
                    <Input id="pincode" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <pre>{JSON.stringify(form.formState.errors)}</pre> */}
            <DialogFooter>
              <Button
                loadingText="Saving..."
                isLoading={addAddress.isPending}
                size={"lg"}
                type="submit"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export const AddressDataCard = ({
  type,
  phone,
  street,
  pincode,
}: {
  phone: string;
  type: "pickup" | "franchise" | "delivery";
  street: string;
  pincode: number;
}) => {
  return (
    <HStack className="w-full items-start gap-8 rounded-radius border-2 bg-card p-8 transition-colors duration-200">
      <PinIcon className="h-10 w-10 text-primary/40" />
      <VStack className="gap-2">
        <HStack className="rounded-full border border-primary bg-primary/10 px-3 py-1">
          <Text styles={"small"} className="text-primary">
            {type}
          </Text>
        </HStack>
        <Text styles={"p_ui_medium"}>{phone}</Text>
        <Text styles={"subtle"} className="text-muted-foreground">
          <i>{street}</i>
        </Text>
        <Text styles={"subtle"} className="text-muted-foreground">
          {pincode}
        </Text>
      </VStack>
    </HStack>
  );
};

export const AddressCard = ({ description, title, type }: AddressCardProps) => {
  return (
    <AddressCardDialog {...{ description, title, type }}>
      <HStack className="w-full items-center gap-8 rounded-radius border-2 border-dashed bg-card p-10 transition-colors duration-200 hover:cursor-pointer hover:border-primary/50 active:scale-95">
        <PlusCircleIcon className="h-10 w-10 text-primary/40" />
        <VStack className="gap-1">
          <Text styles={"p_ui_medium"}>{title}</Text>
          <Text styles={"subtle"} className="text-muted-foreground">
            <i>{description}</i>
          </Text>
        </VStack>
      </HStack>
    </AddressCardDialog>
  );
};
