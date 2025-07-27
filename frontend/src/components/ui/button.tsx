import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex hover:cursor-pointer font-pirate font-semibold duration-300 font-bold items-center justify-center gap-2 whitespace-nowrap rounded-md transition",
  {
    variants: {
      variant: {
        default: "bg-brown text-beige hover:brightness-125",
        inv: "",
        blue: "bg-blue-600 text-zinc-50 hover:brightness-125",
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
