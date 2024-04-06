import { Text, View } from "react-native";
import { cva, VariantProps } from "class-variance-authority";

import StatusItem from "./status-item";

const statsVariants = cva(
  "flex h-auto flex-1 items-center justify-center gap-3 rounded-md border-2  border-slate-300 bg-card p-6 shadow-md dark:border-slate-800",
  {
    variants: {
      variant: {
        "pick-up": "",
        shipping: "",
        delivered: "",
      },
    },
    defaultVariants: {
      variant: "pick-up",
    },
  },
);

interface StatsCardProps
  extends React.ComponentProps<typeof View>,
    VariantProps<typeof statsVariants> {
  stats: number | string;
}

export default function StatsCard({
  stats,
  className,
  variant,
  ...props
}: StatsCardProps) {
  return (
    <View className={statsVariants({ className, variant })} {...props}>
      <Text className="text-3xl font-bold text-card-foreground">{stats}</Text>
      <View className="flex flex-row items-center">
        <StatusItem intent={"ghost"} variant={variant} size={"sm"} />
      </View>
    </View>
  );
}
