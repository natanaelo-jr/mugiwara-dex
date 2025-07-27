import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "px-3 py-3 w-full text-sm transition shadow-md rounded-md focus:brightness-150 focus:outline-none",
  {
    variants: {
      variant: {
        default: "text-zinc-100",
        blue: "placeholder:text-zinc-50/50 focus:text-zinc-50 text-zinc-50",
        zinc: "border-zinc-600 text-zinc-900 focus:border-zinc-900",
        error: "border-red-500 text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type InputVariantProps = VariantProps<typeof inputVariants>;

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputVariantProps {}

function Input({ className, type, variant, ...props }: Props) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input };
