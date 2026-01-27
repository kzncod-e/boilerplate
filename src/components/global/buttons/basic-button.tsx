"use client";

import React, { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "ghost" | "outline";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonRounded = "none" | "sm" | "md" | "lg" | "full";

export interface BasicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
  success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  info: "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "h-7 px-2 text-xs font-medium",
  sm: "h-8 px-3 text-sm font-medium",
  md: "h-10 px-4 text-sm font-medium",
  lg: "h-12 px-6 text-base font-medium",
  xl: "h-14 px-8 text-lg font-medium",
};

const roundedClasses: Record<ButtonRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const iconSizeClasses: Record<ButtonSize, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

export const BasicButton = forwardRef<HTMLButtonElement, BasicButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      rounded = "md",
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center",
          "font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          
          // Variant styles
          variantClasses[variant],
          
          // Size styles
          sizeClasses[size],
          
          // Rounded styles
          roundedClasses[rounded],
          
          // Width styles
          fullWidth && "w-full",
          
          // Custom className
          className
        )}
        disabled={isDisabled}
        onClick={loading ? undefined : onClick}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <Loader2 className={cn(
            "animate-spin",
            iconSizeClasses[size],
            children && "mr-2"
          )} />
        )}
        
        {/* Left icon */}
        {leftIcon && !loading && (
          <span className={cn(
            iconSizeClasses[size],
            children && "mr-2"
          )}>
            {leftIcon}
          </span>
        )}
        
        {/* Button content */}
        {children}
        
        {/* Right icon */}
        {rightIcon && !loading && (
          <span className={cn(
            iconSizeClasses[size],
            children && "ml-2"
          )}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

BasicButton.displayName = "BasicButton";