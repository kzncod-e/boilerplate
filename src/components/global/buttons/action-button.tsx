"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BasicButton, BasicButtonProps } from "./basic-button";

interface ActionButtonProps extends Omit<BasicButtonProps, "loading" | "onClick" | "onError"> {
  action?: () => Promise<void> | void;
  confirmText?: string;
  confirmTitle?: string;
  showConfirmation?: boolean;
  successText?: string;
  errorText?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  loadingText?: string;
  resetAfterSuccess?: boolean;
  resetDelay?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      action,
      confirmText,
      confirmTitle,
      showConfirmation = false,
      successText = "Success!",
      errorText = "Error occurred",
      onSuccess,
      onError,
      loadingText,
      resetAfterSuccess = false,
      resetDelay = 2000,
      children,
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      
      // Show confirmation if needed
      if (showConfirmation && !showConfirm) {
        setShowConfirm(true);
        return;
      }

      // Reset states
      setError(null);
      setSuccess(false);
      setLoading(true);

      try {
        if (action) {
          await action();
        }
        
        setSuccess(true);
        if (onSuccess) {
          onSuccess();
        }

        // Reset after success if configured
        if (resetAfterSuccess) {
          setTimeout(() => {
            setSuccess(false);
            setShowConfirm(false);
          }, resetDelay);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : errorText;
        setError(errorMessage);
        if (onError && err instanceof Error) {
          onError(err);
        }
      } finally {
        setLoading(false);
        if (showConfirm) {
          setShowConfirm(false);
        }
      }
    };

    const handleCancel = () => {
      setShowConfirm(false);
    };

    const getButtonText = () => {
      if (loading && loadingText) return loadingText;
      if (success && successText) return successText;
      if (showConfirm && confirmText) return confirmText;
      return children;
    };

    const getVariant = (): BasicButtonProps["variant"] => {
      if (success) return "success";
      if (error) return "danger";
      if (showConfirm) return "warning";
      return props.variant || "default";
    };

    return (
      <div className="relative inline-block">
        <BasicButton
          ref={ref}
          loading={loading}
          disabled={disabled || loading}
          variant={getVariant()}
          onClick={handleClick}
          {...props}
        >
          {getButtonText()}
        </BasicButton>

        {/* Confirmation Dialog */}
        {showConfirm && (
          <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-max">
            {confirmTitle && (
              <h4 className="font-semibold text-gray-900 mb-2">
                {confirmTitle}
              </h4>
            )}
            <p className="text-sm text-gray-600 mb-4">
              {confirmText || "Are you sure you want to proceed?"}
            </p>
            <div className="flex gap-2 justify-end">
              <BasicButton
                size="sm"
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </BasicButton>
              <BasicButton
                size="sm"
                variant="danger"
                onClick={handleClick}
              >
                Confirm
              </BasicButton>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="absolute top-full left-0 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg shadow-lg z-50 min-w-max">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
      </div>
    );
  }
);

ActionButton.displayName = "ActionButton";
