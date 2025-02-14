import { cn } from "../lib/utils";
import { Button, buttonVariants } from "./button";
import { HStack } from "./stack";

interface PackageProps extends React.ComponentProps<typeof Button> {}
export function Package({ children, ...props }: PackageProps) {
  return (
    <Button
      className="h-fit w-full justify-start gap-2 p-3"
      variant={"ghost"}
      {...props}
    >
      {children}
    </Button>
  );
}

Package.displayName = "Package";

interface PackageThumbneilProps extends React.HTMLAttributes<HTMLDivElement> {}
export const PackageThumbneil = ({
  children,
  className,
  ...props
}: PackageThumbneilProps) => {
  return (
    <div
      className={cn(
        "relative h-10 w-14 overflow-hidden rounded-radius border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const PackageBody = ({ children, ...props }: PackageThumbneilProps) => {
  return <div {...props}>{children}</div>;
};
