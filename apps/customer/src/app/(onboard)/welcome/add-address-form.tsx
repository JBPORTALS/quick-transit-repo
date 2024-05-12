"use client";

import { PlusCircleIcon } from "lucide-react";
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
import { Form, useForm } from "@qt/ui/form";
import { Input } from "@qt/ui/input";
import { Label } from "@qt/ui/label";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

const AddressSchema = z.object({
  pick_up_adress: z.string().min(1, "Pick Up address is Mandatory"),
  franchisee_address: z.string().min(1, "Franchisee address is manadotory"),
  delivery_address: z.string().min(1, "Delivery address is manadotory"),
});

interface AddressCardProps {
  title: string;
  description: string;
}

interface AddressCardDialogProps extends AddressCardProps {
  children: React.ReactNode;
}

const AddressCardDialog = ({
  children,
  description,
  title,
}: AddressCardDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AddressCard = ({ description, title }: AddressCardProps) => {
  return (
    <AddressCardDialog {...{ description, title }}>
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

export default function AddAddressForm() {
  const form = useForm<typeof AddressSchema>({
    defaultValues: {
      delivery_address: "",
      franchisee_address: "",
      pick_up_adress: "",
    },
    mode: "onChange",
    schema: AddressSchema,
  });

  return (
    <Form {...form}>
      <form className="w-1/3 space-y-4">
        <AddressCard
          title="Add Pick Up Address"
          description="Where we have to pick up your package."
        />
        <AddressCard
          title="Add Franchise Address"
          description="Where we have to deliver your package"
        />
        <AddressCard
          title="Add Delivery Address"
          description="Where franchise has to deliver your package."
        />
        <Button className="w-full" size={"lg"}>
          Continue
        </Button>
      </form>
    </Form>
  );
}
