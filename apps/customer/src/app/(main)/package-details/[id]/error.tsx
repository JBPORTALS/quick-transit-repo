"use client";

// Error boundaries must be Client Components
import { useEffect } from "react";

import { Button } from "@qt/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="col-span-7 flex h-[50vh] flex-col items-center justify-center gap-3">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {error.message}
      </h3>
      <p className="text-xl text-muted-foreground">
        Something went wrong, try again later
      </p>
      <Button
        variant={"outline"}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
