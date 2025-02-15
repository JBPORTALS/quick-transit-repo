"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";

import { RouterOutputs } from "@qt/api";
import { Input } from "@qt/ui/input";

import { api } from "~/trpc/react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

export default function PackagesList({
  initialData,
}: {
  initialData: RouterOutputs["packages"]["getAll"];
}) {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );
  const { data, isStale, isFetching } = api.packages.getAll.useQuery(
    { query },
    {
      initialData,
    },
  );

  return (
    <>
      <div className="relative mb-3 flex w-full items-center">
        {isStale && isFetching ? (
          <Loader2Icon className="absolute ml-2.5 mr-2.5 size-4 animate-spin" />
        ) : (
          <SearchIcon className="absolute ml-2.5 mr-2.5 size-4 text-muted-foreground" />
        )}
        <Input
          placeholder="Search here..."
          className="h-10 ps-8"
          value={query ?? ""}
          onChange={(event) =>
            setQuery(event.target.value, { clearOnDefault: true })
          }
        />
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
