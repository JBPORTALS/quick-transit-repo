import { IndianRupee, SlidersVertical } from "lucide-react";

import Header from "@qt/ui/header";
import Rightbar from "@qt/ui/rightbar";

import { api } from "~/trpc/server";

export default async function HomePage() {
  const posts = api.post.all();

  return (
    <main className="flex h-full">
      <div className="h-full w-full p-8">
        <h1 className="text-3xl font-bold">Good Morning</h1>
        <div className="mt-10 rounded-lg border">
          <div className="flex h-16 items-center justify-between px-10">
            <h1 className="text-xl font-semibold ">Requests</h1>
            <span>
              <div className="flex gap-5 text-xl font-semibold">
                10,028
                <SlidersVertical />
              </div>
            </span>
          </div>
          <div className="mx-6 mb-8 h-72 border"></div>
        </div>

        <div className="mt-10 rounded-lg border">
          <div className="flex h-16 items-center justify-between px-10">
            <h1 className="text-xl font-semibold ">Payments</h1>
            <span>
              <div className="flex gap-5 text-xl font-semibold">
                <div className="flex">
                  <IndianRupee />
                  12,10,000
                </div>

                <SlidersVertical />
              </div>
            </span>
          </div>
          <div className="mx-6 mb-8 h-72 border"></div>
        </div>
      </div>
      <div className="w-1/3">
        <Rightbar />
      </div>
    </main>
  );
}
