"use client";

import { cn } from "../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react"
import { Button } from "./button";


const requestVariants = cva("flex h-fit p-[17px] w-[642px] gap-3  border rounded-md", {
  variants: {
    variant: {
      default: "flex-row justify-between items-center",
      vertical: "flex-col"
    }
  }
})

type RequestContextType = VariantProps<typeof requestVariants>;

const RequestContext = React.createContext<RequestContextType>({ variant: "default" });

interface RequestContextProviderProps extends React.ComponentProps<typeof RequestContext.Provider>, VariantProps<typeof requestVariants> { }

const RequestContextProvider = ({ children, variant, ...props }: RequestContextProviderProps) => {
  return <RequestContext.Provider {...props}>{children}</RequestContext.Provider>
}

interface RequestProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof requestVariants> { }
export default function Requests({
  children,
  className,
  variant,
  ...props
}: RequestProps) {
  return (
    <div
      className={
        requestVariants({ className, variant })
      }
      {...props}
    >
      <RequestContextProvider value={{ variant }}>
        {children}
      </RequestContextProvider>
    </div>
  );
}

interface RequestLabelProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export const RequestLabel = ({
  children,
  className,
  ...props
}: RequestLabelProps) => {
  return (
    <h2
      className={cn(" text-sm font-semibold", className)}
      {...props}
    >
      {children}
    </h2>
  );
};

interface RequestDivProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export const RequestDiv = ({
  children,
  className,
  ...props
}: RequestDivProps) => {
  return (
    <h2
      className={cn("", className)}
      {...props}
    >
      {children}
    </h2>
  );
};


interface RequestWeightLabelProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export const RequestWeightLabel = ({
  children,
  className,
  ...props
}: RequestWeightLabelProps) => {
  return (
    <h2
      className={cn("text-xs font-medium gap-4", className)}
      {...props}
    >
      {children}
    </h2>
  );
};



interface RequestTimeLabelProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export const RequestTimeLabel = ({
  children,
  className,
  ...props
}: RequestTimeLabelProps) => {
  return (
    <h2
      className={cn(" text-muted-foreground text-xs flex", className)}
      {...props}
    >
      {children}
    </h2>
  );
};


interface RequestTimeLabelProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export const RequestImage = ({
  children,
  className,
  ...props
}: RequestTimeLabelProps) => {
  return (
    <div className="w-16 h-12 border" >
      {children}
    </div>
  );
};



interface RequestBodyProps extends React.HTMLAttributes<HTMLDivElement> { }

export const RequestBody = ({
  children,
  className,
  ...props
}: RequestBodyProps) => {
  const { variant } = React.useContext(RequestContext)
  return (
    <div className={cn("flex  h-full flex-row w-full gap-3", className)} {...props}>
      {children}
    </div>
  );
};

interface RequestButtonProps extends React.ComponentProps<typeof Button> { }

export const RequestButton = ({
  children,
  className,
  ...props
}: RequestButtonProps) => {
  const {variant} = React.useContext(RequestContext)
  return (
    <Button {...props} size={variant==="default"?"md":"lg"} className={cn(className,variant==="default"?"w-fit":"w-full")} variant={variant==="default"?"secondary":"outline"}>View</Button>
  )
}





