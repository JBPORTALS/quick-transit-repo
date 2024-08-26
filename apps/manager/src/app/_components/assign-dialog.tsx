"use client";

import React, { useState } from "react";

import { RouterOutputs } from "@qt/api";
import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Button } from "@qt/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@qt/ui/dialog";
import { Input } from "@qt/ui/input";
import { ScrollArea } from "@qt/ui/scroll-area";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { api } from "~/trpc/react";

type PartnerRouteReturnType = Awaited<RouterOutputs["auth"]["getPartners"][0]>;

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

  const assignPartner = api.packages.assignPartner.useMutation({
    onSuccess(data) {
      utils.packages.getTrackingDetails.invalidate();
      utils.packages.getAllPackagesWithTracking.invalidate();
      utils.packages.getAllTrackingDetails.invalidate();
      onOpenChange(false); //shut the dialog
    },
  });

  async function onAssignPartner() {
    if (packageId)
      await assignPartner.mutateAsync({
        packageId: packageId,
        partnerId: partner.id,
      });
    // onOpenChange(false);
  }

  return (
    <HStack className="w-full items-center justify-between pr-3">
      <HStack>
        <Avatar>
          <AvatarImage src={partner.picture ?? undefined} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <VStack className="gap-0">
          <Text>{partner.name}</Text>
          <Text styles={"small"}>4.3</Text>
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
