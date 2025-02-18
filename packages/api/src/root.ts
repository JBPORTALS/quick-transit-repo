import { addressRouter } from "./router/address";
import { authRouter } from "./router/auth";
import { billsRouter } from "./router/bills";
import { categoriesRouter } from "./router/categories";
import { courierRouter } from "./router/courier";
import { packagesRouter } from "./router/packages";
import { requestsRouter } from "./router/requests";
import { reviewsRouter } from "./router/reviews";
import { timeslotsRouter } from "./router/timeslots";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  address: addressRouter,
  packages: packagesRouter,
  requests: requestsRouter,
  category: categoriesRouter,
  couriers: courierRouter,
  bills: billsRouter,
  reviews: reviewsRouter,
  timeslots: timeslotsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
