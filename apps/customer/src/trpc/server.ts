import { cache } from "react";
import { headers } from "next/headers";

import { createCaller, createContextInner, createTRPCContext } from "@qt/api";

import { createClient } from "~/utils/server";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return await createContextInner({
    supabase: createClient(),
  });
});

export const api = createCaller(createContext);
