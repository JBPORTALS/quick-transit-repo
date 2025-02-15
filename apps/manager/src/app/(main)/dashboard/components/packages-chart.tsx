"use client";

import React from "react";
import { isUndefined } from "lodash";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { RouterOutputs } from "@qt/api";
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

import { api } from "~/trpc/react";

const chartConfig = {
  views: {
    label: "Page Views",
  },
  raised: {
    label: "Raised",
    color: "hsl(var(--chart-1))",
  },
  cancelled: {
    label: "Cancelled",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function PackagesChart({
  initialData,
}: {
  initialData: RouterOutputs["packages"]["getAllCountByDate"];
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("raised");
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

  const total = React.useMemo(
    () => ({
      raised: chartData.reduce((acc, curr) => acc + curr.raised, 0),
      cancelled: chartData.reduce((acc, curr) => acc + curr.cancelled, 0),
    }),
    [],
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Packages Raised</CardTitle>
          <CardDescription>
            Showing total packages {activeChart} for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["raised", "cancelled"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className=" aspect-auto h-[250px] min-h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
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
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
