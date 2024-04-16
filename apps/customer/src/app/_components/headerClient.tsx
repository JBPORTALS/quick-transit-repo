"use client";

import { useSearchParams } from "next/navigation";

import { Header, HeaderTitle } from "@qt/ui/header";

export default function HeaderClient() {
  const query = useSearchParams();
  const name = query.get("name");
  console.log("query", query.getAll("name"));
  return (
    <Header className="sticky top-0">
      <HeaderTitle>{name}</HeaderTitle>
    </Header>
  );
}
