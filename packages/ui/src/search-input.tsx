import { SearchIcon } from "lucide-react";

import { cn } from "@qt/ui";
import { Input } from "@qt/ui/input";

export default function SearchInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <div className="relative flex w-auto items-center overflow-x-visible">
      <SearchIcon className="absolute ml-2.5 mr-2.5 size-4 text-muted-foreground" />
      <Input
        className={cn("h-10 rounded-lg bg-accent/20 ps-8", className)}
        {...props}
      />
    </div>
  );
}
