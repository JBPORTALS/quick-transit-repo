import { Text, View } from "react-native";
import { cva, VariantProps } from "class-variance-authority";

const navItemVariants = cva("flex items-center justify-center rounded-md p-3", {
  variants: {
    focused: {
      true: "bg-primary/15",
    },
  },
  defaultVariants: {
    focused: false,
  },
});

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
