import { cva, VariantProps } from "class-variance-authority";

const navItemVariants = cva(
  "flex items-center rounded-sm px-3 py-2 text-lg text-accent-foreground",
  {
    variants: {
      isActive: {
        true: "bg-primary/30 text-black",
      },
    },
  },
);

interface NavItemProps
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
