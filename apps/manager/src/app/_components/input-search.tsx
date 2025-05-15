"use client";

import { parseAsString, useQueryState } from "nuqs";

import { cn } from "@qt/ui";
import SearchInput from "@qt/ui/search-input";

export default function InputSearch({ className }: { className?: string }) {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  );

  return (
    <SearchInput
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
      className={cn("w-full", className)}
      value={query}
    />
  );
}
