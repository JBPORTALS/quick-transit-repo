"use client";

import React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";
import { Button } from "./button";

const requestVariants = cva("flex h-fit w-full gap-3 rounded-md p-[17px]", {
  variants: {
    variant: {
      default: "flex-row items-center justify-between",
      vertical: "flex-col",
    },
  },
});

type RequestContextType = VariantProps<typeof requestVariants>;

const RequestContext = React.createContext<RequestContextType>({
  variant: "default",
});

interface RequestContextProviderProps
  extends React.ComponentProps<typeof RequestContext.Provider>,
    VariantProps<typeof requestVariants> {}

const RequestContextProvider = ({
  children,
  variant,
  ...props
}: RequestContextProviderProps) => {
  return (
    <RequestContext.Provider {...props}>{children}</RequestContext.Provider>
  );
};

interface RequestProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof requestVariants> {}
export default function Requests({
  children,
  className,
  variant,
  ...props
}: RequestProps) {
  return (
    <div className={requestVariants({ className, variant })} {...props}>
      <RequestContextProvider value={{ variant }}>
        {children}
      </RequestContextProvider>
    </div>
  );
}

interface RequestLabelProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const RequestLabel = ({
  children,
  className,
  ...props
}: RequestLabelProps) => {
  return (
    <h2 className={cn(" text-sm font-semibold", className)} {...props}>
      {children}
    </h2>
  );
};

interface RequestDivProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const RequestDiv = ({
  children,
  className,
  ...props
}: RequestDivProps) => {
  return (
    <h2 className={cn("", className)} {...props}>
      {children}
    </h2>
  );
};

interface RequestWeightLabelProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const RequestWeightLabel = ({
  children,
  className,
  ...props
}: RequestWeightLabelProps) => {
  return (
    <h2 className={cn("gap-4 text-xs font-medium", className)} {...props}>
      {children}
    </h2>
  );
};

interface RequestTimeLabelProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const RequestTimeLabel = ({
  children,
  className,
  ...props
}: RequestTimeLabelProps) => {
  return (
    <h2
      className={cn(" flex text-xs text-muted-foreground", className)}
      {...props}
    >
      {children}
    </h2>
  );
};

interface RequestTimeLabelProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const RequestImage = ({
  children,
  className,
  ...props
}: RequestTimeLabelProps) => {
  return (
    <div className="h-12 w-16 border" {...props}>
      {children}
    </div>
  );
};

interface RequestBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RequestBody = ({
  children,
  className,
  ...props
}: RequestBodyProps) => {
  const { variant } = React.useContext(RequestContext);
  return (
    <div
      className={cn("flex  h-full w-full flex-row gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface RequestButtonProps extends React.ComponentProps<typeof Button> {}

export const RequestButton = ({
  children,
  className,
  ...props
}: RequestButtonProps) => {
  const { variant } = React.useContext(RequestContext);
  return (
    <Button
      {...props}
      size={variant === "default" ? "md" : "lg"}
      className={cn(className, variant === "default" ? "w-fit" : "w-full")}
      variant={variant === "default" ? "secondary" : "outline"}
    >
      View
    </Button>
  );
};
