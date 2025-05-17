"use client";

import React from "react";
import { FileDown } from "lucide-react";

import { Button } from "@qt/ui/button";
import { toast } from "@qt/ui/toast";

import { useDownload } from "~/utils/hooks/useDownload";

export function DownloadInvoiceButton({
  packageId,
  packageTitle,
}: {
  packageId: string;
  packageTitle: string;
}) {
  const { download, isPending } = useDownload({
    onSuccess() {
      toast.success("Invoice downloaded successfully");
    },
    onError(error) {
      toast.error(error);
    },
  });

  return (
    <Button
      isLoading={isPending}
      onClick={() =>
        download(
          "images",
          `invoices/${packageId}.png`,
          `${packageTitle}-Franchise-Invoice.png`,
        )
      }
      size={"sm"}
      variant={"outline"}
    >
      <FileDown className="size-4" /> Invoice
    </Button>
  );
}
