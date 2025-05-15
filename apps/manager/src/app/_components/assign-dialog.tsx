"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { isEmpty } from "lodash";
import { StarIcon, User2Icon } from "lucide-react";

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
import { ScrollArea } from "@qt/ui/scroll-area";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";
import { toast } from "@qt/ui/toast";

import { api } from "~/trpc/react";
import InputSearch from "./input-search";
import { SpinnerPage } from "./spinner-page";

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
    async onSuccess() {
      await utils.requests.invalidate();
      await utils.packages.invalidate();
      toast.success("Partner assigned successfully");
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
        <Avatar className="border [&_svg]:size-full">
          <AvatarImage
            alt="partner pic"
            className="bg-gradient-to-r from-primary/50 to-primary/90 object-cover"
          />
          <AvatarFallback className="overflow-hidden bg-primary/20">
            <User2Icon className="mt-3 fill-primary text-transparent" />
          </AvatarFallback>
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

function PartnersList({
  packageId,
  onOpenChange,
}: {
  packageId: string;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    api.auth.getAvailablePartners.useInfiniteQuery(
      { query },
      {
        getNextPageParam: ({ nextCursor }) => nextCursor,
      },
    );

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  if (isLoading) return <SpinnerPage />;

  if (isEmpty(items))
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <h1 className="text-lg font-semibold">No partners to show</h1>
      </div>
    );

  return (
    <ScrollArea className="h-[400px] w-full">
      <VStack className="py-5 pr-2">
        {items.map((partner) => (
          <PartnerListItem
            key={partner.id}
            {...{ partner, packageId, onOpenChange }}
          />
        ))}
        <div className="w-full pr-2 text-center">
          {hasNextPage ? (
            <Button
              onClick={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
              className="w-fit"
              variant={"secondary"}
            >
              Show More
            </Button>
          ) : null}
        </div>
      </VStack>
    </ScrollArea>
  );
}

export default function AssignDialog({
  children,
  packageId,
}: {
  children: React.ReactNode;
  packageId: string;
}) {
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

        <VStack className="h-full w-full">
          <InputSearch />

          <PartnersList packageId={packageId} onOpenChange={onOpenChange} />
        </VStack>
      </DialogContent>
    </Dialog>
  );
}
