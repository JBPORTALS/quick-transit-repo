"use client";

import React from "react";
import { useParams } from "next/navigation";
import { isUndefined } from "lodash";

import { RouterOutputs } from "@qt/api";
import { HStack } from "@qt/ui/stack";

import { api } from "~/trpc/react";

export default function PackageDetails({
  initialData,
}: {
  initialData: RouterOutputs["packages"]["getByPartnerId"];
}) {
  const params = useParams();
  const id = params.id as string;
  const { data } = api.packages.getByPartnerId.useQuery(
    { id },
    { initialData },
  );

  if (isUndefined(data))
    return (
      <div className="flex w-full items-center justify-center py-10">
        No packages yet
      </div>
    );
  return (
    <>
      {data.map((packageDetails) => (
        <HStack key={packageDetails.id}>
          <h4>{packageDetails.package.title}</h4>
        </HStack>
      ))}
    </>
  );
}
