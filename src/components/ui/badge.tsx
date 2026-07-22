import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex cursor-pointer w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent font-normal whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-light-gray border-light-gray text-444 hover:bg-gray hover:text-gray-foreground [a]:hover:bg-primary/80 rounded-full font-style: italic",

        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",

        destructive:
          "bg-destructive/10 border-destructive text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",

        outline:
          "border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground",

        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",

        link:
          "text-primary underline-offset-4 hover:underline",

        success:
          "bg-success text-white",

        successOutline:
          "bg-success/10 border-success text-success",

        pendingOutline:
          "bg-pending/10 border-pending text-pending",
          outlineWhite:
          "bg-white border-black",
      },

      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2 py-0.5 text-sm",
        lg: "px-4 py-1 text-base 2xl:text-xl",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}


function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };