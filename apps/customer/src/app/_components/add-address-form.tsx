"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import { Edit2Icon, Loader, PinIcon, PlusCircleIcon } from "lucide-react";
import { z } from "zod";

import { RouterOutputs } from "@qt/api";
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
import { toast } from "@qt/ui/toast";

import { api } from "~/trpc/react";

export interface AddressCardBaseProps {
  title: string;
  description: string;
  type: "pickup" | "franchise" | "delivery";
  editMode?: boolean;
}

export type AddressCardDialogProps = AddressCardBaseProps &
  (
    | { editMode?: never; addressId?: never }
    | { editMode: true; addressId: string }
  );

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
  description,
  title,
  type,
  editMode,
  addressId,
  children,
}: AddressCardDialogProps & { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const utils = api.useUtils();

  const form = useForm({
    schema: addressFormSchema,
    defaultValues: {
      phone: "",
      pincode: "",
      street: "",
    },
    mode: "onChange",
  });

  const fetchDetails = React.useCallback(async () => {
    setIsLoading(true);
    const data = await utils.address.getById.fetch({ id: addressId! });
    form.reset({
      pincode: data?.pincode,
      street: data?.street ?? "",
      phone: data?.phone,
    });
    setIsLoading(false);
  }, [addressId]);

  React.useEffect(() => {
    if (isOpen && editMode) fetchDetails();
  }, [isOpen]);

  const addAddress = api.address.create.useMutation({
    async onSuccess() {
      await utils.address.invalidate();
      setIsOpen(false);
      form.reset();
    },
  });

  const updateAddress = api.address.update.useMutation({
    async onSuccess() {
      await utils.address.invalidate();
      setIsOpen(false);
      toast.info("Address details updated");
      form.reset();
    },
  });

  async function onSubmit(values: z.infer<typeof addressFormSchema>) {
    if (editMode && addressId) {
      await updateAddress.mutateAsync({
        addressId,
        data: { ...values, type },
      });
    } else {
      await addAddress.mutateAsync({
        ...values,
        type,
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader className="size-7 animate-spin duration-1000" />
          </div>
        ) : (
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
                  isLoading={addAddress.isPending || updateAddress.isPending}
                  size={"lg"}
                  type="submit"
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export const AddressDataCard = ({
  initialData,
}: {
  initialData: Exclude<RouterOutputs["address"]["getByUser"], undefined>;
}) => {
  const { data } = api.address.getById.useQuery(
    { id: initialData.id },
    {
      initialData,
    },
  );

  if (isUndefined(data))
    return (
      <div>
        <h1>Unable to fetch address</h1>
      </div>
    );
  return (
    <HStack className="w-full items-start gap-8 rounded-radius border-2 bg-card p-8 transition-colors duration-200">
      <PinIcon className="h-10 w-10 text-primary/40" />
      <VStack className="gap-2">
        <HStack className="rounded-full border border-primary bg-primary/10 px-3 py-1">
          <Text styles={"small"} className="text-primary">
            {data.type}
          </Text>
        </HStack>
        <Text styles={"p_ui_medium"}>{data.phone}</Text>
        <Text styles={"subtle"} className="text-muted-foreground">
          <i>{data.street}</i>
        </Text>
        <Text styles={"subtle"} className="text-muted-foreground">
          {data.pincode}
        </Text>
      </VStack>
      <HStack className="ml-auto">
        <AddressCardDialog
          editMode
          addressId={data.id}
          title="Edit Address"
          description=""
          type={initialData.type}
        >
          <Button variant={"outline"} size={"icon"}>
            <Edit2Icon className="size-4" />
          </Button>
        </AddressCardDialog>
      </HStack>
    </HStack>
  );
};

export const AddressCard = ({
  description,
  title,
  type,
}: AddressCardBaseProps) => {
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
