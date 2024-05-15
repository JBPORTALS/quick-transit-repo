import React from "react";

import OrderStatus from "./orderStatus";
import { Text } from "./text";

export default function Rightbar() {
  return (
    <div className="flex h-full flex-col gap-2 rounded-md border bg-card px-6 pt-6">
      <div className=" flex flex-col  gap-2 border-b pb-2">
        <Text styles={"p_ui_medium"}>Ongoing Deliveries</Text>
        <Text styles={"p_ui"}>Today</Text>
      </div>
      <div className="h-14 p-2">Current tracking details goes here...</div>
      {/* <div>
        <div className="py-3.5">
          <OrderStatus />
        </div>
        <div className="py-3.5">
          <OrderStatus />
        </div>
        <div className="py-3.5">
          <OrderStatus />
        </div>
      </div> */}
    </div>
  );
}
