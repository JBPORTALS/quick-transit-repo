import { api } from "~/trpc/server";
  import Header from "@qt/ui/header"
  import Rightbar from "@qt/ui/rightbar"
  import { IndianRupee, SlidersVertical } from "lucide-react";
  export default async function HomePage() {

    const posts = api.post.all();

    return (
      <main className="flex">
      
          <div className="p-8 w-full">
            <h1 className="text-3xl font-bold">Good Morning</h1>
            <div className='border rounded-lg mt-10'>
              <div className="h-16 flex justify-between px-10 items-center">
                <h1 className="text-xl font-semibold ">
                  Requests
                </h1>
                <span>
                  <div className="flex gap-5 font-semibold text-xl">
                    10,028


                    <SlidersVertical />
                  </div>
                </span>
              </div>
              <div className="mx-6 mb-8 border h-72">

              </div>
            </div>


            <div className='border rounded-lg mt-10'>
              <div className="h-16 flex justify-between px-10 items-center">
                <h1 className="text-xl font-semibold ">
                  Payments
                </h1>
                <span>
                  <div className="flex gap-5 font-semibold text-xl">
                    <div className="flex">
                      <IndianRupee />
                      12,10,000
                    </div>


                    <SlidersVertical />
                  </div>
                </span>
              </div>
              <div className="mx-6 mb-8 border h-72">

              </div>
            </div>


          </div>
          <div className="w-1/3">
            <Rightbar />
          </div>
      </main>
    );
  }