"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PackageXIcon } from "lucide-react";

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

import { api } from "~/trpc/react";

export default function CancelDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const packageId = params.id as string | undefined;
  const utils = api.useUtils();
  const cancelRequest = api.packages.cancelRequest.useMutation({
    onSuccess() {
      utils.packages.getTrackingDetails.refetch();
    },
  });
  const [open, onOpenChange] = useState(false);

  async function onCancelRequest() {
    if (packageId) await cancelRequest.mutateAsync({ id: packageId });
    onOpenChange(false);
  }

  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You want to cancel the package. once it's cancelled it's
            irreversable process.
          </DialogDescription>
          <DialogFooter>
            <Button
              isLoading={cancelRequest.isPending}
              loadingText="Please wait..."
              onClick={onCancelRequest}
              variant={"destructive"}
            >
              <PackageXIcon /> Cancel Request
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
