import { cva, VariantProps } from "class-variance-authority";

const navItemVariants = cva(
  "flex w-full items-center gap-3 rounded-radius px-3 py-2 text-sm text-accent-foreground ", //flex items-center gap-3 rounded-sm px-3 py-2 text-base text-accent-foreground"
  {
    variants: {
      isActive: {
        true: "bg-primary/10 text-foreground",
        false: "text-accent-foreground",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

export interface NavItemProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navItemVariants> {}

export default function NavItem({
  className,
  children,
  isActive,
  ...props
}: NavItemProps) {
  return (
    <button className={navItemVariants({ className, isActive })} {...props}>
      {children}
    </button>
  );
}