import React from "react";
import { cn } from "@/lib/utils";

interface Step {
  id: string | number;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepChange?: (step: number) => void;
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  onStepChange,
  className,
}:StepperProps) {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      {steps.map((step, index) => {
        const isActive = currentStep === index;
        const isCompleted = currentStep > index;

        return (
          <React.Fragment key={step.id}>
            <h5             
              onClick={() => onStepChange?.(index)}
              className={cn(
                "relative pb-1  transition-all px-5 cursor-pointer",
                isActive || isCompleted
                  ? "text-[#167A20]"
                  : "text-black/20"
              )}
            >
              {step.label}

              {(isActive || isCompleted) && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#167A20]" />
              )}
            </h5>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-5 h-[1px]",
                  isCompleted ? "bg-[#167A20]" : "bg-black/20"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}