"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface Step {
  label: string;
  stepNum: number;
}

interface OnboardingWizardHeaderProps {
  steps: Step[];
  currentStep: number;
}

export function OnboardingWizardHeader({
  steps,
  currentStep,
}: OnboardingWizardHeaderProps) {
  return (
    <div className="w-full my-8">
      <div className="flex items-center justify-between relative">
        {steps.map(({ label, stepNum }, index) => {
          const isActive = currentStep === stepNum;
          const isCompleted = currentStep > stepNum;

          return (
            <div
              key={stepNum}
              className="flex flex-col items-center text-center flex-1 relative"
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                  isActive && "bg-emerald-600 text-white shadow",
                  isCompleted && "bg-emerald-200 text-emerald-900",
                  !isActive && !isCompleted && "bg-gray-200 text-gray-700"
                )}
              >
                {stepNum}
              </div>

              {/* Step Label */}
              <p
                className={cn(
                  "mt-2 text-sm transition-colors",
                  isActive ? "text-emerald-700 font-medium" : "text-gray-500"
                )}
              >
                {label}
              </p>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-5 left-[55%] w-full">
                  <Separator
                    className={cn(
                      "w-[90%] mx-auto h-0.5",
                      isActive || isCompleted ? "bg-emerald-400" : "bg-gray-300"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
