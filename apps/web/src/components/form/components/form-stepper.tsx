import { CheckIcon } from "lucide-react";

interface FormStepperProps {
  steps: string[];
  currentStep: number;
}

export function FormStepper({ steps, currentStep }: FormStepperProps) {
  return (
    <div className="mb-8">
      <div className="relative flex justify-between">
        {/* Progress bar */}
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-muted" />

        {/* Completed progress */}
        <div
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-primary transition-all duration-300 ease-in-out"
          style={{
            width: `${Math.max(0, (currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Step indicators */}
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1;
          const isCurrent = currentStep === index + 1;

          return (
            <div
              key={index}
              className="relative flex flex-col items-center z-10"
            >
              <div
                className={`flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                      ? "border-primary bg-background text-primary"
                      : "border-muted bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <CheckIcon className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs md:text-sm font-medium text-center ${
                  isCompleted || isCurrent
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <span className="hidden md:inline">{step}</span>
                <span className="md:hidden">
                  {step.split(" ")[0]}
                  {step.includes("&")
                    ? " & " + step.split("& ")[1].split(" ")[0]
                    : ""}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
