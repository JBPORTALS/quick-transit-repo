"use client";

import React, { FormEventHandler } from "react";
import Image from "next/image";

import { Button } from "@qt/ui/button";

import { SigninWithGoogle } from "~/utils/actions/auth";

export default function AuthButton() {
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await SigninWithGoogle();
  };
  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col space-y-5">
      <Button size={"lg"} variant={"outline"}>
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
