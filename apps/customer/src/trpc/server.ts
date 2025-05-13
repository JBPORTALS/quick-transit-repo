import { cache } from "react";
import { headers } from "next/headers";

import { createCaller, createContextInner } from "@qt/api";

import { createClient } from "~/utils/server";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const nextHeaders = await headers();
  const heads = new Headers(nextHeaders);
  heads.set("x-trpc-source", "rsc");

  heads.set("x-trpc-source", "rsc");

  const {
    data: { user },
  } = await (await createClient()).auth.getUser();

  return await createContextInner({
    user,
  });
});

export const api = createCaller(createContext);
