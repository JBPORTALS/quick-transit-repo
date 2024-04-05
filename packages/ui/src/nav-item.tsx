import { cva, VariantProps } from "class-variance-authority";

const navItemVariants = cva(
  "rounded-radius flex items-center gap-3 rounded-sm px-3 py-2 text-base text-accent-foreground",
  {
    variants: {
      isActive: {
        true: "bg-primary/20 text-black",
      },
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
