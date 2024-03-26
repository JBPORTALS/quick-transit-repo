import { Text, TouchableOpacity } from "react-native";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "flex items-center justify-center rounded-md px-4 py-3",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        ghost: "broder-primary border bg-transparent",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const buttonTextVariants = cva("text-xl", {
  variants: {
    variant: {
      primary: "text-primary-foreground",
      ghost: "text-secondary-foreground",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends React.ComponentProps<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  textClassName?: string;
}

export default function Button({
  children,
  className,
  variant,
  textClassName,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={buttonVariants({ className, variant })}
      {...props}
    >
      <Text
        className={buttonTextVariants({ variant, className: textClassName })}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
