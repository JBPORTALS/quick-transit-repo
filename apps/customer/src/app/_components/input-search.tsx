"use client";

import { parseAsString, useQueryState } from "nuqs";

import SearchInput from "@qt/ui/search-input";

export default function InputSearch() {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  );

  return (
    <SearchInput
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
      className="w-full"
      value={query}
    />
  );
}
