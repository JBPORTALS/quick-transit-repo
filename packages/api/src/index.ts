import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "./root";
import { appRouter } from "./root";
import {
  clientSupabase,
  getServiceSupabase,
  getUserAsAdmin,
  supabase,
} from "./supabase/supabaseClient";
import {
  createCallerFactory,
  createContextInner,
  createTRPCContext,
} from "./trpc";

/**
 * Create a server-side caller for the tRPC API
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
const createCaller = createCallerFactory(appRouter);

/**
 * Inference helpers for input types
 * @example
 * type PostByIdInput = RouterInputs['post']['byId']
 *      ^? { id: number }
 **/
type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = RouterOutputs['post']['all']
 *      ^? Post[]
 **/
type RouterOutputs = inferRouterOutputs<AppRouter>;

export {
  createTRPCContext,
  createContextInner,
  appRouter,
  createCaller,
  supabase,
  clientSupabase,
  getServiceSupabase,
  getUserAsAdmin,
};
export type { AppRouter, RouterInputs, RouterOutputs };
