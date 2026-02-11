"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BasicButton } from "@/components/global/buttons/basic-button";

export interface FormFieldProps {
    label?: string;
    error?: string;
    helper?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
    (
        { label, error, helper, required, disabled, className, children },
        ref,
    ) => {
        return (
            <div ref={ref} className={cn("space-y-2", className)}>
                {label && (
                    <Label className={cn(disabled && "opacity-50")}>
                        {label}
                        {required && (
                            <span className="text-destructive ml-1">*</span>
                        )}
                    </Label>
                )}

                {children}

                {error && <p className="text-sm text-destructive">{error}</p>}

                {helper && !error && (
                    <p className="text-sm text-muted-foreground">{helper}</p>
                )}
            </div>
        );
    },
);

FormField.displayName = "FormField";

export interface CustomInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    leftIcon?: React.ReactNode;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ className, error, leftIcon, ...props }, ref) => {
        return (
            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        {leftIcon}
                    </div>
                )}
                <Input
                    ref={ref}
                    className={cn(
                        leftIcon && "pl-10",
                        error &&
                            "border-destructive focus-visible:ring-destructive/20",
                        className,
                    )}
                    {...props}
                />
            </div>
        );
    },
);

CustomInput.displayName = "CustomInput";

export interface CustomTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
}

export const CustomTextarea = forwardRef<
    HTMLTextAreaElement,
    CustomTextareaProps
>(({ className, error, ...props }, ref) => {
    return (
        <Textarea
            ref={ref}
            className={cn(
                "min-h-[80px] resize-vertical",
                error && "border-destructive focus-visible:ring-destructive/20",
                className,
            )}
            {...props}
        />
    );
});

CustomTextarea.displayName = "CustomTextarea";

export interface CustomSelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    options?: { value: string; label: string }[];
    placeholder?: string;
    error?: boolean;
    disabled?: boolean;
    className?: string;
}

export const CustomSelect = forwardRef<HTMLButtonElement, CustomSelectProps>(
    (
        {
            value,
            onValueChange,
            options = [],
            placeholder,
            error,
            disabled,
            className,
        },
        ref,
    ) => {
        return (
            <Select
                value={value}
                onValueChange={onValueChange}
                disabled={disabled}
            >
                <SelectTrigger
                    ref={ref}
                    className={cn(
                        error &&
                            "border-destructive focus-visible:ring-destructive/20",
                        className,
                    )}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        );
    },
);

CustomSelect.displayName = "CustomSelect";

export interface RadioGroupProps {
    options: { value: string; label: string }[];
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
    disabled?: boolean;
    className?: string;
    orientation?: "horizontal" | "vertical";
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
    (
        {
            options,
            value,
            onChange,
            name,
            disabled,
            className,
            orientation = "vertical",
        },
        ref,
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "space-y-2",
                    orientation === "horizontal" &&
                        "flex items-center space-y-0 space-x-4",
                    className,
                )}
            >
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={cn(
                            "flex items-center space-x-2 text-sm font-medium cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-foreground",
                            disabled && "opacity-50 cursor-not-allowed",
                        )}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange?.(option.value)}
                            disabled={disabled}
                            className="h-4 w-4 text-primary focus-visible:ring-ring/50 border-input"
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
        );
    },
);

RadioGroup.displayName = "RadioGroup";

export interface CheckboxGroupProps {
    options: { value: string; label: string }[];
    selectedValues?: string[];
    onChange?: (values: string[]) => void;
    name?: string;
    disabled?: boolean;
    className?: string;
    orientation?: "horizontal" | "vertical";
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
    (
        {
            options,
            selectedValues = [],
            onChange,
            name,
            disabled,
            className,
            orientation = "vertical",
        },
        ref,
    ) => {
        const handleChange = (value: string, checked: boolean) => {
            const newValues = checked
                ? [...selectedValues, value]
                : selectedValues.filter((v) => v !== value);
            onChange?.(newValues);
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "space-y-2",
                    orientation === "horizontal" &&
                        "flex items-center space-y-0 space-x-4",
                    className,
                )}
            >
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={cn(
                            "flex items-center space-x-2 text-sm font-medium cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-foreground",
                            disabled && "opacity-50 cursor-not-allowed",
                        )}
                    >
                        <input
                            type="checkbox"
                            name={name}
                            value={option.value}
                            checked={selectedValues.includes(option.value)}
                            onChange={(e) =>
                                handleChange(option.value, e.target.checked)
                            }
                            disabled={disabled}
                            className="h-4 w-4 text-primary focus-visible:ring-ring/50 border-input rounded"
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
        );
    },
);

CheckboxGroup.displayName = "CheckboxGroup";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <form ref={ref} className={cn("space-y-6", className)} {...props}>
                {children}
            </form>
        );
    },
);

Form.displayName = "Form";

// Re-export shadcn components for convenience
export { Button, Input, Textarea, Label };
