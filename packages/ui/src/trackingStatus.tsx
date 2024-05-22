"use client";
import React, { useRef, useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const AddStatusVariants = cva("", {
  variants: {
    variant: {
      success: "text-green-500",
      pending: "text-gray-500",
      process: "text-primary",
    },
  },
  defaultVariants: {
    variant: "pending",
  },
});

type VariantKeys = VariantProps<typeof AddStatusVariants>["variant"];

interface AddStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantKeys;
}

interface TrackingStatusContextType {
  variant: VariantKeys;
}

const TrackingStatusContext = React.createContext<TrackingStatusContextType>({
  variant: "pending",
});

const TrackingStatusContextProvider = ({
  children,
  variant = "pending",
  ...props
}: React.PropsWithChildren<{ variant?: VariantKeys }>) => {
  return (
    <TrackingStatusContext.Provider value={{ variant }} {...props}>
      {children}
    </TrackingStatusContext.Provider>
  );
};

export default function TrackingStatus({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [lineBottom, setLineBottom] = useState<number | null>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineRef.current) {
      const lastAddStatus = document.querySelector(".add-status:last-child svg");
      if (lastAddStatus) {
        const lastAddStatusRect = lastAddStatus.getBoundingClientRect();
        const lastAddStatusBottom = lastAddStatusRect.bottom;
        const lineRect = lineRef.current.getBoundingClientRect();
        const lineTop = lineRect.top;
        setLineBottom(lastAddStatusBottom - lineTop);
      }
    }
  }, [children]);

  return (
    <div className={cn("relative ml-6", className)} {...props}>
      <ul className="list-none space-y-6">
        {children}
      </ul>
      <div
        ref={lineRef}
        className="absolute left-[19px] top-2 bottom-5 w-0.5 bg-muted-foreground"
        style={{ height: lineBottom ? `${lineBottom}px` : "auto" }}
      ></div>
    </div>
  );
}

export const AddStatus = ({
  children,
  className,
  variant,
  ...props
}: AddStatusProps) => {
  return (
    <li className="flex items-start space-x-2">
      <svg
        className={cn(
          "z-20 h-10 w-10 flex-shrink-0",
          AddStatusVariants({ variant }),
          className
        )}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <circle cx="10" cy="10" r="6" />
      </svg>
      <div className="flex-grow pt-2">
        <div className={cn("flex flex-col gap-1 w-full", className)} {...props}>
          {children}
        </div>
      </div>
    </li>
  );
};