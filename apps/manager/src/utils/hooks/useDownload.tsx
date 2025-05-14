// hooks/useDownload.ts
"use client";

import { useState, useTransition } from "react";

import { downloadInvoice } from "../actions/invoice";

export function useDownload(
  args: {
    onSuccess?: () => void;
    onError?: (error: string) => void;
  } | void,
) {
  const [isPending, startTransition] = useTransition();

  const download = (bucket: string, path: string, fileName: string) => {
    startTransition(async () => {
      try {
        const buffer = await downloadInvoice(bucket, path);
        const blob = new Blob([buffer]);
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
        args?.onSuccess?.();
      } catch (err: any) {
        console.error(err);
        args?.onError?.(err.message || "Failed to download");
      }
    });
  };

  return { isPending, download };
}
