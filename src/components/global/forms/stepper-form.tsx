"use client";

import React, { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { BasicButton } from "@/components/global/buttons/basic-button";

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
        ref,
    ) => {
        const [internalStep, setInternalStep] = useState(0);
        const [stepData, setStepData] = useState<Record<string, any>>({});
        const [validating, setValidating] = useState(false);

        const currentStep =
            controlledStep !== undefined ? controlledStep : internalStep;
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
                <Button
                    key={step.id}
                    variant="ghost"
                    onClick={() => handleStepClick(stepIndex)}
                    disabled={!allowSkip && status === "pending"}
                    className={cn(
                        "flex items-center",
                        orientation === "horizontal" ? "flex-row" : "flex-col",
                        "h-auto p-0",
                        stepClassName,
                    )}
                >
                    {/* Step Circle */}
                    <div
                        className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-colors",
                            isActive &&
                                "border-primary bg-primary text-primary-foreground",
                            isCompleted &&
                                "border-success bg-success text-success-foreground",
                            status === "pending" &&
                                "border-input bg-background text-muted-foreground",
                            !allowSkip &&
                                status === "pending" &&
                                "cursor-not-allowed opacity-50",
                            allowSkip &&
                                status === "pending" &&
                                "hover:border-muted-foreground cursor-pointer",
                        )}
                    >
                        {getStepIcon(stepIndex)}
                    </div>

                    {/* Step Text */}
                    <div
                        className={cn(
                            "ml-3 text-left",
                            orientation === "vertical" &&
                                "ml-0 mt-2 text-center",
                        )}
                    >
                        <div
                            className={cn(
                                "text-sm font-medium",
                                isActive && "text-primary",
                                isCompleted && "text-success",
                                status === "pending" && "text-muted-foreground",
                            )}
                        >
                            {step.title}
                            {step.optional && (
                                <span className="ml-1 text-xs text-muted-foreground">
                                    (optional)
                                </span>
                            )}
                        </div>
                        {step.description && (
                            <div
                                className={cn(
                                    "text-xs",
                                    isActive && "text-primary/70",
                                    isCompleted && "text-success/70",
                                    status === "pending" &&
                                        "text-muted-foreground/70",
                                )}
                            >
                                {step.description}
                            </div>
                        )}
                    </div>
                </Button>
            );
        };

        const renderProgress = () => {
            if (!showProgress) return null;

            return (
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                            Step {currentStep + 1} of {steps.length}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {Math.round(
                                ((currentStep + 1) / steps.length) * 100,
                            )}
                            % Complete
                        </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                        <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${((currentStep + 1) / steps.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            );
        };

        return (
            <div ref={ref} className={cn("w-full", className)}>
                {/* Step Indicators */}
                <div
                    className={cn(
                        "mb-8",
                        orientation === "horizontal"
                            ? "flex items-center justify-between"
                            : "space-y-4",
                    )}
                >
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={cn(
                                "flex items-center",
                                orientation === "horizontal" && "flex-1",
                            )}
                        >
                            {renderStepIndicator(step, index)}

                            {/* Connector Line */}
                            {orientation === "horizontal" &&
                                index < steps.length - 1 && (
                                    <div
                                        className={cn(
                                            "flex-1 h-px mx-4",
                                            index < currentStep
                                                ? "bg-success"
                                                : "bg-input",
                                        )}
                                    />
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
                <div className={cn("flex justify-between", buttonClassName)}>
                    <div>
                        {!isFirstStep && (
                            <BasicButton
                                variant="outline"
                                size="md"
                                onClick={handlePrevious}
                                disabled={loading}
                                leftIcon={<ChevronLeft className="h-4 w-4" />}
                            >
                                {prevButtonText}
                            </BasicButton>
                        )}
                    </div>

                    <div className="flex gap-2">
                        {allowSkip && !isLastStep && (
                            <BasicButton
                                variant="outline"
                                size="md"
                                onClick={() =>
                                    handleStepChange(currentStep + 1)
                                }
                                disabled={loading}
                            >
                                Skip
                            </BasicButton>
                        )}

                        <BasicButton
                            variant="primary"
                            size="md"
                            onClick={handleNext}
                            disabled={loading || validating}
                            loading={loading || validating}
                            rightIcon={
                                isLastStep ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )
                            }
                        >
                            {isLastStep ? completeButtonText : nextButtonText}
                        </BasicButton>
                    </div>
                </div>
            </div>
        );
    },
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
        <FormItem className={cn("space-y-4", className)}>{children}</FormItem>
    );
};
