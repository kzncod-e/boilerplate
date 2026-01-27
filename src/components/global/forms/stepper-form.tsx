"use client";

import React, { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

export interface Step {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  optional?: boolean;
  validate?: () => boolean | Promise<boolean>;
}

export interface StepperFormProps {
  steps: Step[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: (data: Record<string, any>) => void;
  onStepSubmit?: (step: number, data: Record<string, any>) => void;
  allowSkip?: boolean;
  showProgress?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
  stepClassName?: string;
  contentClassName?: string;
  buttonClassName?: string;
  nextButtonText?: string;
  prevButtonText?: string;
  completeButtonText?: string;
  loading?: boolean;
}

export const StepperForm = forwardRef<HTMLDivElement, StepperFormProps>(
  (
    {
      steps,
      currentStep: controlledStep,
      onStepChange,
      onComplete,
      onStepSubmit,
      allowSkip = false,
      showProgress = true,
      orientation = "horizontal",
      className,
      stepClassName,
      contentClassName,
      buttonClassName,
      nextButtonText = "Next",
      prevButtonText = "Previous",
      completeButtonText = "Complete",
      loading = false,
    },
    ref
  ) => {
    const [internalStep, setInternalStep] = useState(0);
    const [stepData, setStepData] = useState<Record<string, any>>({});
    const [validating, setValidating] = useState(false);

    const currentStep = controlledStep !== undefined ? controlledStep : internalStep;
    const currentStepData = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;

    const handleStepChange = (newStep: number) => {
      if (newStep >= 0 && newStep < steps.length) {
        if (controlledStep === undefined) {
          setInternalStep(newStep);
        }
        onStepChange?.(newStep);
      }
    };

    const validateCurrentStep = async () => {
      if (currentStepData.validate) {
        setValidating(true);
        try {
          const isValid = await currentStepData.validate();
          setValidating(false);
          return isValid;
        } catch (error) {
          setValidating(false);
          return false;
        }
      }
      return true;
    };

    const handleNext = async () => {
      const isValid = await validateCurrentStep();
      
      if (isValid) {
        // Call step submit callback
        onStepSubmit?.(currentStep, stepData);
        
        if (isLastStep) {
          // Complete the wizard
          onComplete?.(stepData);
        } else {
          // Move to next step
          handleStepChange(currentStep + 1);
        }
      }
    };

    const handlePrevious = () => {
      if (!isFirstStep) {
        handleStepChange(currentStep - 1);
      }
    };

    const handleStepClick = (stepIndex: number) => {
      // Only allow clicking on completed steps or the next step
      if (stepIndex <= currentStep || allowSkip) {
        handleStepChange(stepIndex);
      }
    };

    const getStepStatus = (stepIndex: number) => {
      if (stepIndex < currentStep) return "completed";
      if (stepIndex === currentStep) return "active";
      return "pending";
    };

    const getStepIcon = (stepIndex: number) => {
      const status = getStepStatus(stepIndex);
      
      if (status === "completed") {
        return <Check className="h-4 w-4" />;
      }
      
      return stepIndex + 1;
    };

    const renderStepIndicator = (step: Step, stepIndex: number) => {
      const status = getStepStatus(stepIndex);
      const isActive = status === "active";
      const isCompleted = status === "completed";

      return (
        <button
          key={step.id}
          onClick={() => handleStepClick(stepIndex)}
          disabled={!allowSkip && status === "pending"}
          className={cn(
            "flex items-center",
            orientation === "horizontal" ? "flex-row" : "flex-col",
            stepClassName
          )}
        >
          {/* Step Circle */}
          <div
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-colors",
              isActive && "border-blue-500 bg-blue-500 text-white",
              isCompleted && "border-green-500 bg-green-500 text-white",
              status === "pending" && "border-gray-300 bg-white text-gray-500",
              !allowSkip && status === "pending" && "cursor-not-allowed opacity-50",
              allowSkip && status === "pending" && "hover:border-gray-400 cursor-pointer"
            )}
          >
            {getStepIcon(stepIndex)}
          </div>

          {/* Step Text */}
          <div className={cn(
            "ml-3 text-left",
            orientation === "vertical" && "ml-0 mt-2 text-center"
          )}>
            <div className={cn(
              "text-sm font-medium",
              isActive && "text-blue-600",
              isCompleted && "text-green-600",
              status === "pending" && "text-gray-500"
            )}>
              {step.title}
              {step.optional && (
                <span className="ml-1 text-xs text-gray-400">(optional)</span>
              )}
            </div>
            {step.description && (
              <div className={cn(
                "text-xs",
                isActive && "text-blue-500",
                isCompleted && "text-green-500",
                status === "pending" && "text-gray-400"
              )}>
                {step.description}
              </div>
            )}
          </div>
        </button>
      );
    };

    const renderProgress = () => {
      if (!showProgress) return null;

      return (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      );
    };

    return (
      <div ref={ref} className={cn("w-full", className)}>
        {/* Step Indicators */}
        <div className={cn(
          "mb-8",
          orientation === "horizontal" ? "flex items-center justify-between" : "space-y-4"
        )}>
          {steps.map((step, index) => (
            <div key={step.id} className={cn(
              "flex items-center",
              orientation === "horizontal" && "flex-1"
            )}>
              {renderStepIndicator(step, index)}
              
              {/* Connector Line */}
              {orientation === "horizontal" && index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-px mx-4",
                  index < currentStep ? "bg-green-500" : "bg-gray-300"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        {renderProgress()}

        {/* Step Content */}
        <div className={cn("mb-8", contentClassName)}>
          {currentStepData.content}
        </div>

        {/* Navigation Buttons */}
        <div className={cn(
          "flex justify-between",
          buttonClassName
        )}>
          <div>
            {!isFirstStep && (
              <button
                type="button"
                onClick={handlePrevious}
                disabled={loading}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md",
                  "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-colors"
                )}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                {prevButtonText}
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {allowSkip && !isLastStep && (
              <button
                type="button"
                onClick={() => handleStepChange(currentStep + 1)}
                disabled={loading}
                className={cn(
                  "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md",
                  "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-colors"
                )}
              >
                Skip
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={loading || validating}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md",
                "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-colors"
              )}
            >
              {loading || validating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : isLastStep ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-2" />
              )}
              {isLastStep ? completeButtonText : nextButtonText}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

StepperForm.displayName = "StepperForm";

export interface StepperStepProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  optional?: boolean;
  onValidate?: () => boolean | Promise<boolean>;
  className?: string;
}

export const StepperStep: React.FC<StepperStepProps> = ({
  title,
  description,
  children,
  optional = false,
  onValidate,
  className,
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
};