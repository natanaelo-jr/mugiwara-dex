import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex leading-none uppercase font-semibold hover:cursor-pointer font-pirate duration-300 font-bold items-center justify-center whitespace-nowrap rounded-md transition",
  {
    variants: {
      variant: {
        default: "bg-brown text-beige hover:brightness-125",
        inv: "hover:brightness-125 text-brown",
        blue: "bg-blue-600 text-zinc-50 hover:brightness-125",
        pagination:
          "text-zinc-800 hover:text-purple-900 font-oswald uppercase text-sm",
        paginationActive:
          "text-zinc-950 hover:cursor-not-allowed font-oswald uppercase text-sm",
        cancel: "text-zinc-800 hover:bg-zinc-400",
        submit:
          "bg-purple-950 text-zinc-200 hover:brightness-125 hover:bg-blue-800",
        combo: "font-op text-zinc-800 shadow-md normal-case font-normal",
      },
      size: {
        default: "text-lg px-4 py-1",
        sm: "px-3 py-1 text-sm",
        lg: "text-xl px-6 py-2",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
