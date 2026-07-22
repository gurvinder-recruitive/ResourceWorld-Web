import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils"


type RadioGroupProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Root
>;

function RadioGroup({
  className,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props} />
  );
}

type RadioGroupItemProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>;

function RadioGroupItem({
  className,
  ...props
}:RadioGroupItemProps) {
  return (
   <RadioGroupPrimitive.Item
  data-slot="radio-group-item"
  className={cn(
    "group/radio-group-item peer relative flex aspect-square size-5 shrink-0 rounded-full border-2 border-input",
    "focus-visible:ring-0 focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:border-[#FF5A50]",
    className
  )}
  {...props}
>
  <RadioGroupPrimitive.Indicator
    data-slot="radio-group-indicator"
    className="flex items-center justify-center"
  >
    <span
      className="
        absolute
        top-1/2
        left-1/2
        size-2.5
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-[#FF5A50]
      "
    />
  </RadioGroupPrimitive.Indicator>
</RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem }
