"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PackageXIcon } from "lucide-react";

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

export default function AssignDialog({
  children,
  packageId,
}: {
  children: React.ReactNode;
  packageId: string;
}) {
  const utils = api.useUtils();

  const partners = api.auth.getPartners.useQuery();

  const [open, onOpenChange] = useState(false);

  async function onCancelRequest() {
    // if (packageId) await cancelRequest.mutateAsync({ id: packageId });
    // onOpenChange(false);
  }

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
                <Button variant={"outline"}>Assign</Button>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </DialogContent>
    </Dialog>
  );
}
