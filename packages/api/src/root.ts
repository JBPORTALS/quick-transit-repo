import { addressRouter } from "./router/address";
import { authRouter } from "./router/auth";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  address: addressRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
