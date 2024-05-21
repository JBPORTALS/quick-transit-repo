"use client";

import React, { lazy, Suspense } from "react";
import { Circle, LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

import { cn } from "@qt/ui";
import { Separator } from "@qt/ui/seperator";
import { Skeleton } from "@qt/ui/skeleton";
import { VStack } from "@qt/ui/stack";

interface VStackProps extends React.ComponentProps<typeof VStack> {}

interface TrackingBarIItemProps extends VStackProps {
  isActive?: boolean;
}

const TarckingContext = React.createContext<{ isActive: boolean }>({
  isActive: false,
});

const fallback = (
  <Skeleton className="size-5 rounded-full border-2 border-current" />
);

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export function TrackingBarItem({
  children,
  className,
  isActive = false,
  ...props
}: TrackingBarIItemProps) {
  return (
    <div
      className={cn(
        "tracking-bar-item group grid h-fit max-h-fit w-full grid-cols-10 items-start gap-0 ",
        className,
        isActive && "trackbar-active",
      )}
      {...props}
    >
      <TarckingContext.Provider value={{ isActive }}>
        {children}
      </TarckingContext.Provider>
    </div>
  );
}
interface TrackingBarIndicatorProps extends VStackProps {
  icon?: IconProps["name"];
}
export function TrackingBarIndicator({
  className,
  icon = "circle-check",
  ...props
}: TrackingBarIndicatorProps) {
  const { isActive } = React.useContext(TarckingContext);
  return (
    <VStack
      {...props}
      className={cn(
        "track-indi group col-span-1 h-full items-center gap-0 text-muted-foreground/40 transition-colors duration-300",
        isActive && "isActive text-primary",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center bg-card text-current  group-has-[~.trackbar-active]:text-primary",
        )}
      >
        <Icon name={icon} className="size-5" />
      </div>
      <Separator
        className={cn(
          " h-full min-h-12 w-[0.15rem] group-last-[.tracking-bar-item]:hidden group-[.trackbar-active]:bg-primary/30  group-has-[~.trackbar-active]:bg-primary",
        )}
        orientation="vertical"
      />
    </VStack>
  );
}

export function TrackingBarContent({
  children,
  className,
  ...props
}: VStackProps) {
  return (
    <VStack
      className={cn(
        "col-span-9 w-full items-start justify-start gap-2 px-3",
        className,
      )}
      {...props}
    >
      {children}
    </VStack>
  );
}

export function TrackingBar({ children, className, ...props }: VStackProps) {
  return (
    <VStack
      {...props}
      className={cn("w-full items-center justify-center gap-0", className)}
    >
      {children}
    </VStack>
  );
}
