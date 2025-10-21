import React from "react";

type StepperProps = {
  currentStep: number;
};

export const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const steps = ["Identity", "Menu", "Payment"];
  return (
    <div className="w-full max-w-2xl mx-auto px-4 ">
      {/* HERE IS THE FIX: 
        Changed 'items-center' to 'items-start'.
        This aligns the top of the line with the top of the circle.
      */}
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          return (
            <React.Fragment key={step}>
              {/* This is the Step block (Circle + Text) */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    isActive || isCompleted
                      ? "bg-secondary text-white"
                      : "bg-muted-foreground/20 text-muted-foreground"
                  }`}
                >
                  {stepNumber}
                </div>
                <p
                  className={`mt-2 text-sm font-semibold ${
                    isActive || isCompleted
                      ? "text-secondary"
                      : "text-muted-foreground"
                  }`}
                >
                  {step}
                </p>
              </div>

              {/* This is the Line block */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    isCompleted ? "bg-secondary" : "bg-muted-foreground/20"
                  }
                  
                  HERE IS THE FIX:
                  'mt-5' pushes the line down by half the circle's height (h-10),
                  centering it perfectly.
                  `}
                  style={{ marginTop: "1.25rem" }} // This is 'mt-5' (20px). Using style for clarity.
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};