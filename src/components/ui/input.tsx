import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "h-10 2xl:h-12 w-full rounded-sm  leading-none border border-[#dddddd] bg-gray-muted px-4 py-[12px] text-base 2xl:text-[17px] outline-none transition-colors placeholder:text-777 focus-visible:border-[#000000] focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "border-[#dddddd] bg-[rgba(246,246,246,0.4)]",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  }
)
interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default";
}

function Input({ className, variant, type, ...props }:InputProps) {
  return (
    <input
      type={type}
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Input }