"use client";

import React from "react";
import { FileDown } from "lucide-react";

import { Button } from "@qt/ui/button";
import { toast } from "@qt/ui/toast";

import { useDownload } from "~/utils/hooks/useDownload";

export function DownloadDocument({
  path,
  fileName,
  children,
  ...props
}: React.ComponentProps<typeof Button> & { path: string; fileName: string }) {
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
      {...props}
      isLoading={isPending}
      onClick={() => download("images", path, fileName)}
    >
      {children}
    </Button>
  );
}
