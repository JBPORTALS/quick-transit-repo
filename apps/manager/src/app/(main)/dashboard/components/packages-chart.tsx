"use client";

import React from "react";
import { isUndefined } from "lodash";
import { Calendar } from "lucide-react";
import moment from "moment";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { RouterInputs, RouterOutputs } from "@qt/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@qt/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@qt/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@qt/ui/select";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { api } from "~/trpc/react";

const chartData = [
  { date: "2024-04-01", count: 222, mobile: 150 },
  { date: "2024-04-02", count: 97, mobile: 180 },
  { date: "2024-04-03", count: 167, mobile: 120 },
  { date: "2024-04-04", count: 242, mobile: 260 },
  { date: "2024-04-05", count: 373, mobile: 290 },
  { date: "2024-04-06", count: 301, mobile: 340 },
  { date: "2024-04-07", count: 245, mobile: 180 },
  { date: "2024-04-08", count: 409, mobile: 320 },
  { date: "2024-04-09", count: 59, mobile: 110 },
  { date: "2024-04-10", count: 261, mobile: 190 },
  { date: "2024-04-11", count: 327, mobile: 350 },
  { date: "2024-04-12", count: 292, mobile: 210 },
  { date: "2024-04-13", count: 342, mobile: 380 },
  { date: "2024-04-14", count: 137, mobile: 220 },
  { date: "2024-04-15", count: 120, mobile: 170 },
  { date: "2024-04-16", count: 138, mobile: 190 },
  { date: "2024-04-17", count: 446, mobile: 360 },
  { date: "2024-04-18", count: 364, mobile: 410 },
  { date: "2024-04-19", count: 243, mobile: 180 },
  { date: "2024-04-20", count: 89, mobile: 150 },
  { date: "2024-04-21", count: 137, mobile: 200 },
  { date: "2024-04-22", count: 224, mobile: 170 },
  { date: "2024-04-23", count: 138, mobile: 230 },
  { date: "2024-04-24", count: 387, mobile: 290 },
  { date: "2024-04-25", count: 215, mobile: 250 },
  { date: "2024-04-26", count: 75, mobile: 130 },
  { date: "2024-04-27", count: 383, mobile: 420 },
  { date: "2024-04-28", count: 122, mobile: 180 },
  { date: "2024-04-29", count: 315, mobile: 240 },
  { date: "2024-04-30", count: 454, mobile: 380 },
  { date: "2024-05-01", count: 165, mobile: 220 },
  { date: "2024-05-02", count: 293, mobile: 310 },
  { date: "2024-05-03", count: 247, mobile: 190 },
  { date: "2024-05-04", count: 385, mobile: 420 },
  { date: "2024-05-05", count: 481, mobile: 390 },
  { date: "2024-05-06", count: 498, mobile: 520 },
  { date: "2024-05-07", count: 388, mobile: 300 },
  { date: "2024-05-08", count: 149, mobile: 210 },
  { date: "2024-05-09", count: 227, mobile: 180 },
  { date: "2024-05-10", count: 293, mobile: 330 },
  { date: "2024-05-11", count: 335, mobile: 270 },
  { date: "2024-05-12", count: 197, mobile: 240 },
  { date: "2024-05-13", count: 197, mobile: 160 },
  { date: "2024-05-14", count: 448, mobile: 490 },
  { date: "2024-05-15", count: 473, mobile: 380 },
  { date: "2024-05-16", count: 338, mobile: 400 },
  { date: "2024-05-17", count: 499, mobile: 420 },
  { date: "2024-05-18", count: 315, mobile: 350 },
  { date: "2024-05-19", count: 235, mobile: 180 },
  { date: "2024-05-20", count: 177, mobile: 230 },
  { date: "2024-05-21", count: 82, mobile: 140 },
  { date: "2024-05-22", count: 81, mobile: 120 },
  { date: "2024-05-23", count: 252, mobile: 290 },
  { date: "2024-05-24", count: 294, mobile: 220 },
  { date: "2024-05-25", count: 201, mobile: 250 },
  { date: "2024-05-26", count: 213, mobile: 170 },
  { date: "2024-05-27", count: 420, mobile: 460 },
  { date: "2024-05-28", count: 233, mobile: 190 },
  { date: "2024-05-29", count: 78, mobile: 130 },
  { date: "2024-05-30", count: 340, mobile: 280 },
  { date: "2024-05-31", count: 178, mobile: 230 },
  { date: "2024-06-01", count: 178, mobile: 200 },
  { date: "2024-06-02", count: 470, mobile: 410 },
  { date: "2024-06-03", count: 103, mobile: 160 },
  { date: "2024-06-04", count: 439, mobile: 380 },
  { date: "2024-06-05", count: 88, mobile: 140 },
  { date: "2024-06-06", count: 294, mobile: 250 },
  { date: "2024-06-07", count: 323, mobile: 370 },
  { date: "2024-06-08", count: 385, mobile: 320 },
  { date: "2024-06-09", count: 438, mobile: 480 },
  { date: "2024-06-10", count: 155, mobile: 200 },
  { date: "2024-06-11", count: 92, mobile: 150 },
  { date: "2024-06-12", count: 492, mobile: 420 },
  { date: "2024-06-13", count: 81, mobile: 130 },
  { date: "2024-06-14", count: 426, mobile: 380 },
  { date: "2024-06-15", count: 307, mobile: 350 },
  { date: "2024-06-16", count: 371, mobile: 310 },
  { date: "2024-06-17", count: 475, mobile: 520 },
  { date: "2024-06-18", count: 107, mobile: 170 },
  { date: "2024-06-19", count: 341, mobile: 290 },
  { date: "2024-06-20", count: 408, mobile: 450 },
  { date: "2024-06-21", count: 169, mobile: 210 },
  { date: "2024-06-22", count: 317, mobile: 270 },
  { date: "2024-06-23", count: 480, mobile: 530 },
  { date: "2024-06-24", count: 132, mobile: 180 },
  { date: "2024-06-25", count: 141, mobile: 190 },
  { date: "2024-06-26", count: 434, mobile: 380 },
  { date: "2024-06-27", count: 448, mobile: 490 },
  { date: "2024-06-28", count: 149, mobile: 200 },
  { date: "2024-06-29", count: 103, mobile: 160 },
  { date: "2024-06-30", count: 446, mobile: 400 },
];

const chartConfig = {
  count: {
    label: "Raised",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function PackagesChart({
  initialData,
}: {
  initialData: RouterOutputs["packages"]["getAllCountByDate"];
}) {
  const [timeRange, setTimeRange] = React.useState("90d");
  const { data: chartData } = api.packages.getAllCountByDate.useQuery(
    undefined,
    {
      initialData,
    },
  );

  if (isUndefined(chartData)) return null;

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Packages Raised</CardTitle>
          <CardDescription>Showing total packages raised</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className=" aspect-auto h-[250px] min-h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              {/* <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient> */}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            {/* <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            /> */}
            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-count)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
