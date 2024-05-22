"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@qt/ui/button";

import { api } from "~/trpc/react";

export default function OnboardButton() {
  const router = useRouter();
  const updateRole = api.auth.updateUserRole.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <Button
      onClick={() => {
        updateRole.mutate({ role: "customer" });
      }}
      isLoading={updateRole.isPending}
      loadingText="Please wait"
      className="w-full"
      size={"lg"}
    >
      Continue
    </Button>
  );
}
