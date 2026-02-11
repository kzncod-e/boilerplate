"use client";

import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ModalSize = "small" | "normal" | "lg" | "xl" | "full";

interface BasicModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: ModalSize;
  children: React.ReactNode;
  footerLeft?: React.ReactNode;
  footerRight?: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  small: "max-w-md",
  normal: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "w-screen h-screen",
};

export function BasicModal({
  isOpen,
  onClose,
  title,
  description,
  size = "normal",
  children,
  footerLeft,
  footerRight,
  showCloseButton = true,
  className,
}: BasicModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={cn(
          "relative w-full mx-4 transform transition-all",
          sizeClasses[size],
          size === "full" && "m-0 w-screen h-screen",
          className,
        )}
      >
        <div
          className={cn(
            "relative bg-card shadow-xl",
            size === "full" ? "w-full h-full rounded-none" : "rounded-lg",
          )}
        >
          {/* Header */}
          {(title || description || showCloseButton) && (
            <div className="flex items-start justify-between p-6 border-b">
              <div className="flex-1">
                {title && (
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div
            className={cn(
              "p-6",
              size === "full" && "flex-1 overflow-y-auto p-0",
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {(footerLeft || footerRight) && (
            <div
              className={cn(
                "flex items-center justify-between p-6 border-t bg-gray-50 dark:bg-primary/10",
                size === "full" ? "rounded-none" : "rounded-b-lg",
              )}
            >
              <div className="flex-1">{footerLeft}</div>
              <div className="flex gap-3">{footerRight}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
