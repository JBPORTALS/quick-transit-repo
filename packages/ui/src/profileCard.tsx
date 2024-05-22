"use client";

import { cn } from "../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react"


const profileCardVariants = cva("flex ", {
  variants: {
    variant: {
      default: "flex-row gap-3 items-center",
     
    }
  }
})

type ProfileContextType = VariantProps<typeof profileCardVariants>;

const ProfileContext = React.createContext<ProfileContextType>({ variant: "default" });

interface ProfileContextProviderProps extends React.ComponentProps<typeof ProfileContext.Provider>, VariantProps<typeof profileCardVariants> { }

const ProfileContextProvider = ({ children, variant, ...props }: ProfileContextProviderProps) => {
  return <ProfileContext.Provider {...props}>{children}</ProfileContext.Provider>
}

interface ProfileProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileCardVariants> { }
export default function Profile({
  children,
  className,
  variant,
  ...props
}: ProfileProps) {
  return (
    <div
      className={cn("items-center gap-1.5 ",
        profileCardVariants({ className, variant }))
      }
      {...props}
    >
      <ProfileContextProvider value={{ variant }}>
        {children}
      </ProfileContextProvider>
    </div>
  );
}


interface ProfileContentProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export const ProfileContent = ({
  children,
  className,
  ...props
}: ProfileContentProps) => {
  return (
    <h2
      className={cn("flex flex-col gap-1 w-full",className)}
      {...props}
    >
      {children}
    </h2>
  );
};

interface ProfileLeftProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export const ProfileLeft = ({
  children,
  className,
  ...props
}: ProfileLeftProps) => {
  return (
    <h2
      className={className}
      {...props}
    >
      {children}
    </h2>
  );
};


interface ProfileRightProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export const ProfileRight = ({
  children,
  className,
  ...props
}: ProfileRightProps) => {
  return (
    <h2
    className={cn("flex justify-end w-fit",className)}
      {...props}
    >
      {children}
    </h2>
  );
};
