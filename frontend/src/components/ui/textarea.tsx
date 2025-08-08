import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full ronded-sm border-zinc-500 shadow-md focus:outline-none p-3 text-sm",
        "placeholder:text-zinc-600 text-zinc-800",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
