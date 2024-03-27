import { Text, View } from "react-native";
import { cva, VariantProps } from "class-variance-authority";

const navItemVariants = cva(
  "flex items-center justify-center rounded-md px-3 py-2",
  {
    variants: {
      focused: {
        true: "bg-primary/20 dark:bg-primary/40",
      },
    },
    defaultVariants: {
      focused: false,
    },
  },
);

interface NavItemProps
  extends React.ComponentProps<typeof View>,
    VariantProps<typeof navItemVariants> {}

export default function NavItem({
  children,
  className,
  focused,
  ...props
}: NavItemProps) {
  return (
    <View className={navItemVariants({ className, focused })} {...props}>
      {children}
    </View>
  );
}
