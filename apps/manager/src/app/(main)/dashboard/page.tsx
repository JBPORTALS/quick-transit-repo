"use client";

import { useState } from "react";
import { faker } from "@faker-js/faker";
import { Calendar } from "lucide-react";
import moment from "moment";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { RouterInputs } from "@qt/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@qt/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@qt/ui/select";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

type ByType = RouterInputs["packages"]["getPackagesAnalytics"]["by"];

const data = Array.from({ length: 54 }).map(() => ({
  date: faker.date.between({
    from: "2024-06-01T00:00:00.000Z",
    to: "2024-06-30T00:00:00.000Z",
  }),
  count: faker.number.int({ min: 0, max: 100 }),
}));

const paymentsData = Array.from({ length: 54 }).map(() => ({
  date: faker.date.between({
    from: "2023-06-01T00:00:00.000Z",
    to: "2024-06-30T00:00:00.000Z",
  }),
  amt: faker.number.int({ min: 600, max: 50000 }),
}));

let INR = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 2,
});

let NumberFormat = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

let INRWithoutNotation = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

function PaymentsAnalyticsCard() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={paymentsData}>
        <defs>
          <linearGradient id="brandGradient" x1={0} y1={0} x2={0} y2={1}>
            <stop offset={"0%"} stopColor="#6B36B0" stopOpacity={0.5} />
            <stop offset={"75%"} stopColor="#6B36B0" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area
          strokeWidth={2}
          stroke="#6B36B0"
          dataKey={"amt"}
          fill="url(#brandGradient)"
        />
        <XAxis
          dataKey="date"
          className="text-xs"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value, index) => {
            if (index % 2 === 0 && index !== 0)
              return moment(value).format("MMM DD");
            else return "";
          }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickCount={8}
          tickFormatter={(value) => {
            return INR.format(value);
          }}
          className="text-xs"
          dataKey="amt"
        />
        <Tooltip
          content={({ payload, active, label }) => {
            if (active)
              return (
                <VStack className="w-32 gap-1 rounded-radius border bg-card px-4 py-2 shadow-sm">
                  <Text styles={"subtle_medium"}>
                    {moment(label).format("MMM DD")}
                  </Text>
                  <Text styles={"small"} className="text-accent-foreground/80">
                    {INRWithoutNotation.format(payload?.at(0)?.payload.amt)}
                  </Text>
                </VStack>
              );
          }}
        />
        <CartesianGrid vertical={false} opacity={0.1} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function PackagesAnalyticsCard({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="brandGradient" x1={0} y1={0} x2={0} y2={1}>
            <stop offset={"0%"} stopColor="#6B36B0" stopOpacity={0.5} />
            <stop offset={"75%"} stopColor="#6B36B0" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area
          strokeWidth={2}
          stroke="#6B36B0"
          dataKey={"count"}
          fill="url(#brandGradient)"
        />
        <XAxis
          dataKey="date"
          className="text-xs"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value, index) => {
            if (index % 2 === 0 && index !== 0)
              return moment(value).format("MMM DD");
            else return "";
          }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            if (Number.isInteger(value)) return NumberFormat.format(value);
            else return "";
          }}
          className="text-xs"
          dataKey="count"
        />
        <Tooltip
          content={({ payload, active, label }) => {
            if (active)
              return (
                <VStack className="w-32 gap-1 rounded-radius border bg-card px-4 py-2 shadow-sm">
                  <Text styles={"subtle_medium"}>
                    {moment(label).format("MMM DD")}
                  </Text>
                  <Text styles={"small"} className="text-accent-foreground/80">
                    {NumberFormat.format(payload?.at(0)?.payload.count)}
                  </Text>
                </VStack>
              );
          }}
        />
        <CartesianGrid vertical={false} opacity={0.1} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default function page() {
  const [by, setBy] = useState<ByType>("all");

  // const { data } = api.packages.getPackagesAnalytics.useQuery({ by });
  return (
    <VStack className="col-span-4 w-full gap-5">
      <Card className="w-full shadow-none">
        <CardHeader>
          <HStack className="w-full items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Packages Raised Analytics</CardTitle>
              <CardDescription>
                Track and analyze the number of packages raised over time.
              </CardDescription>
            </div>
            <Select onValueChange={(value: ByType) => setBy(value)} value={by}>
              <SelectTrigger className="w-[145px]">
                <HStack className="items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <SelectValue placeholder="Select Filter" />
                </HStack>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </HStack>
        </CardHeader>
        <CardContent>
          <PackagesAnalyticsCard data={data} />
        </CardContent>
      </Card>
      <Card className="w-full shadow-none">
        <CardHeader>
          <HStack className="w-full items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Payments Analytics</CardTitle>
              <CardDescription>
                Monitor and analyze payment over time.
              </CardDescription>
            </div>
            <Select defaultValue="week">
              <SelectTrigger className="w-[145px]">
                <HStack className="items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <SelectValue placeholder="Select Filter" />
                </HStack>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </HStack>
        </CardHeader>
        <CardContent>
          <PaymentsAnalyticsCard />
        </CardContent>
      </Card>
    </VStack>
  );
}
