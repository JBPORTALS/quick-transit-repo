import { Text, TouchableOpacity } from "react-native";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "flex items-center justify-center rounded-md px-4 py-2",
  {
    variants: {
      variant: {
        primary: "bg-primary ",
        ghost: "broder-primary border bg-transparent ",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const buttonTextVariants = cva("text-lg", {
  variants: {
    variant: {
      primary: "text-white",
      ghost: "text-black",
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
