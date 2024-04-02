
"use client";


import { cn } from "../lib/utils";


interface VStackProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const VStack= ({
  children,
  className,
  ...props
}: VStackProps) => {
  return (
    <h2
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      {children}
    </h2>
  );
};

interface HstackProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const Hstack = ({
  children,
  className,
  ...props
}: HstackProps) => {
  return (
    <h2
      className={cn("flex gap-3", className)}
      {...props}
    >
      {children}
    </h2>
  );
};
