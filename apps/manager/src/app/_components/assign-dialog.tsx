"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "lucide-react";

import { RouterOutputs } from "@qt/api";
import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Button } from "@qt/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@qt/ui/dialog";
import { Input } from "@qt/ui/input";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { api } from "~/trpc/react";

type PartnerRouteReturnType = Awaited<
  RouterOutputs["auth"]["getPartners"]["items"][0]
>;

function PartnerListItem({
  partner,
  packageId,
  onOpenChange,
}: {
  partner: PartnerRouteReturnType;
  packageId: string;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const utils = api.useUtils();

  const assignPartner = api.requests.assignPartner.useMutation({
    async onSuccess(data) {
      await utils.requests.invalidate();
      await utils.packages.invalidate();
      onOpenChange(false); //shut the dialog
    },
  });

  async function onAssignPartner() {
    if (packageId)
      await assignPartner.mutateAsync({
        packageId: packageId,
        partnerId: partner.id,
      });
  }

  return (
    <HStack className="w-full items-center justify-between pr-3">
      <HStack>
        <Avatar className="border">
          <AvatarImage
            src={"/partner-pic.png"}
            alt="partner pic"
            className="bg-gradient-to-r from-primary/50 to-primary/90 object-cover"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <VStack className="gap-0">
          <Text>{partner.name}</Text>
          <Text
            styles={"small"}
            className="flex flex-row items-center gap-1 text-muted-foreground"
          >
            <StarIcon className="size-4 text-amber-500" /> 4.5
          </Text>
        </VStack>
      </HStack>
      <Button
        isLoading={assignPartner.isPending}
        onClick={onAssignPartner}
        variant={"outline"}
      >
        Assign
      </Button>
    </HStack>
  );
}

export default function AssignDialog({
  children,
  packageId,
}: {
  children: React.ReactNode;
  packageId: string;
}) {
  const partners = api.auth.getPartners.useQuery();

  const [open, onOpenChange] = useState(false);

  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Partner</DialogTitle>
          <DialogDescription>
            Assign partner to pick up the package
          </DialogDescription>
        </DialogHeader>
        <VStack className="h-full">
          <Input placeholder="Search partner..." />
          <VStack className="h-[400px] w-full overflow-y-auto py-5">
            {partners?.data?.map((partner) => (
              <PartnerListItem {...{ partner, packageId, onOpenChange }} />
            ))}
          </VStack>
        </VStack>
      </DialogContent>
    </Dialog>
  );
}
