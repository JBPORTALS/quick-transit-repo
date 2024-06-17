"use client";

import React, { FormEventHandler, useState } from "react";
import Image from "next/image";

import { Button } from "@qt/ui/button";

import { SigninWithGoogle } from "~/utils/actions/auth";

export default function AuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await SigninWithGoogle();
  };
  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col space-y-5">
      <Button
        isLoading={isLoading}
        loadingText="Signing in with google..."
        size={"lg"}
        variant={"outline"}
      >
        <Image
          src={"/google-icon.png"}
          height={24}
          width={24}
          alt="Google Icon"
        />
        Continue with Google
      </Button>
    </form>
  );
}
