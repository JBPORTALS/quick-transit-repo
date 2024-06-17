"use client";

import React from "react";
import {
  BikeIcon,
  Edit3Icon,
  MoreHorizontalIcon,
  PackageXIcon,
} from "lucide-react";

import { Button } from "@qt/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@qt/ui/dropdown-menu";

import CancelDialog from "./cancel-dialog";

export default function PackageMoreDropdown({
  packageId,
}: {
  packageId: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={(e) => e.preventDefault()}
          size={"icon"}
          variant={"ghost"}
        >
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="py-2">
            <BikeIcon className="mr-2 size-4" /> Assign a Partner
          </DropdownMenuItem>
          <CancelDialog {...{ packageId }}>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="py-2 text-destructive hover:text-destructive"
            >
              <PackageXIcon className="mr-2 size-4" /> Cancel Request
            </DropdownMenuItem>
          </CancelDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
