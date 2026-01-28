"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

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
  ({ label, error, helper, required, disabled, className, children }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {label && (
          <label className={cn(
            "text-sm font-medium text-gray-700",
            disabled && "opacity-50"
          )}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {children}
        
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        
        {helper && !error && (
          <p className="text-sm text-gray-500">{helper}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-10",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-vertical",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options = [], placeholder, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

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
  ({ options, value, onChange, name, disabled, className, orientation = "vertical" }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "space-y-2",
          orientation === "horizontal" && "flex items-center space-y-0 space-x-4",
          className
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center space-x-2 text-sm text-gray-700 cursor-pointer",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              disabled={disabled}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    );
  }
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
  ({ options, selectedValues = [], onChange, name, disabled, className, orientation = "vertical" }, ref) => {
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
          orientation === "horizontal" && "flex items-center space-y-0 space-x-4",
          className
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center space-x-2 text-sm text-gray-700 cursor-pointer",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              disabled={disabled}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn("space-y-6", className)}
        {...props}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = "Form";