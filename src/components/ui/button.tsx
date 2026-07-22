import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex gap-2 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[5px] border bg-clip-padding font-light outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "border-primary bg-primary text-primary-foreground hover:bg-primary/90",

        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90",

        accent:
          "border-accent bg-accent text-accent-foreground hover:bg-accent/90",

        white:
          "border-white bg-white text-white-foreground hover:bg-white/90",

        gray:
          "border-gray bg-gray text-gray-foreground hover:bg-gray/90",

        success:
          "border-transparent bg-success text-success-foreground hover:bg-success/90",

        warning:
          "border-transparent bg-warning text-warning-foreground hover:bg-warning/90",

        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",

        primaryOutline:
          "border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",

        secondaryOutline:
          "border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground",

        accentOutline:
          "border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground",

        grayOutline:
          "border-gray/60 bg-transparent text-gray hover:bg-gray/60 hover:text-white",

        blackOutline:
          "border-black bg-transparent text-black hover:bg-black hover:text-white",

        successOutline:
          "border-success bg-transparent text-success hover:bg-success hover:text-success-foreground",

        warningOutline:
          "border-warning bg-transparent text-warning hover:bg-warning hover:text-warning-foreground",

        destructiveOutline:
          "border-destructive bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground",

        ghost:
          "border bg-transparent hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",

        link:
          "border-transparent bg-transparent underline-offset-4 hover:underline",
      },

      size: {
        default: "h-10 2xl:h-12 px-6 py-2.5 text-base 2xl:text-xl",
        sm: "h-8 px-4 text-sm 2xl:text-base",
        md: "h-10 px-4 text-sm 2xl:text-base",
        lg: "h-14 px-8 text-sm 2xl:text-xl",
        icon: "size-12",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };