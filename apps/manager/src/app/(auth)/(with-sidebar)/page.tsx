"use client";

import { IndianRupee, SlidersVertical } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@qt/ui/button";
import Rightbar from "@qt/ui/rightbar";
import { HStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

const data = [
  {
    price: 5000,
  },
  { price: 1800 },
  { price: 1800 },
  { price: 4000 },
  { price: 4500 },
  { price: 3000 },
  { price: 800 },
  { price: 3300 },
  { price: 8000 },
  { price: 7000 },
];

export default async function HomePage() {
  return (
    <main className="flex h-full">
      <div className="flex h-full w-full flex-col gap-8 p-8">
        <h1 className="text-3xl font-bold">Good Morning</h1>
        <div className="flex flex-col gap-4 rounded-lg border bg-background p-5 dark:bg-secondary">
          <div className="flex items-center justify-between">
            <Text styles={"p_ui_medium"}>Requests</Text>
            <HStack className="items-center">
              <Text styles={"h4"}>10,028</Text>
              <Button variant={"ghost"} size={"icon"}>
                <SlidersVertical className="h-5 w-5" />
              </Button>
            </HStack>
          </div>
          <div className="h-72 rounded-radius border">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar
                  dataKey="price"
                  style={
                    {
                      fill: "hsl(var(--primary))",
                      opacity: 0.9,
                    } as React.CSSProperties
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border bg-background p-5 dark:bg-secondary">
          <div className="flex items-center justify-between">
            <Text styles={"p_ui_medium"}>Payments</Text>
            <HStack className="items-center">
              <Text styles={"h4"}>10,00,028</Text>
              <Button variant={"ghost"} size={"icon"}>
                <SlidersVertical className="h-5 w-5" />
              </Button>
            </HStack>
          </div>
          <div className="h-72 border">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar
                  dataKey="price"
                  style={
                    {
                      fill: "hsl(var(--primary))",
                      opacity: 0.9,
                    } as React.CSSProperties
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="sticky top-20 h-96 w-1/2">
        <Rightbar />
      </div>
    </main>
  );
}
