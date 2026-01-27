"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { BasicButton, BasicButtonProps } from "./basic-button";

export interface GroupedButtonOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

interface GroupedButtonProps {
  options: GroupedButtonOption[];
  selected?: string;
  onSelectionChange?: (selectedId: string) => void;
  variant?: BasicButtonProps["variant"];
  size?: BasicButtonProps["size"];
  rounded?: BasicButtonProps["rounded"];
  orientation?: "horizontal" | "vertical";
  fullWidth?: boolean;
  className?: string;
  buttonClassName?: string;
  showIcons?: boolean;
  allowMultiple?: boolean;
  selectedIds?: string[];
}

export const GroupedButton = forwardRef<HTMLDivElement, GroupedButtonProps>(
  (
    {
      options,
      selected,
      onSelectionChange,
      variant = "outline",
      size = "md",
      rounded = "md",
      orientation = "horizontal",
      fullWidth = false,
      className,
      buttonClassName,
      showIcons = true,
      allowMultiple = false,
      selectedIds = [],
    },
    ref
  ) => {
    const handleButtonClick = (option: GroupedButtonOption) => {
      if (option.disabled) return;

      if (allowMultiple) {
        const newSelectedIds = selectedIds.includes(option.id)
          ? selectedIds.filter(id => id !== option.id)
          : [...selectedIds, option.id];
        
        if (onSelectionChange) {
          onSelectionChange(newSelectedIds.join(","));
        }
      } else {
        if (onSelectionChange) {
          onSelectionChange(option.id);
        }
      }

      if (option.onClick) {
        option.onClick();
      }
    };

    const isSelected = (optionId: string) => {
      if (allowMultiple) {
        return selectedIds.includes(optionId);
      }
      return selected === optionId;
    };

    const orientationClasses = {
      horizontal: "flex-row",
      vertical: "flex-col",
    };

    const firstButtonClasses = {
      horizontal: "rounded-r-none border-r-0",
      vertical: "rounded-b-none border-b-0",
    };

    const lastButtonClasses = {
      horizontal: "rounded-l-none",
      vertical: "rounded-t-none",
    };

    const middleButtonClasses = {
      horizontal: "rounded-none border-r-0",
      vertical: "rounded-none border-b-0",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          orientationClasses[orientation],
          fullWidth && "w-full",
          className
        )}
      >
        {options.map((option, index) => {
          const isFirst = index === 0;
          const isLast = index === options.length - 1;
          const isMiddle = !isFirst && !isLast;

          let positionClasses = "";
          if (isFirst) positionClasses = firstButtonClasses[orientation];
          else if (isLast) positionClasses = lastButtonClasses[orientation];
          else if (isMiddle) positionClasses = middleButtonClasses[orientation];

          return (
            <BasicButton
              key={option.id}
              variant={isSelected(option.id) ? "primary" : variant}
              size={size}
              rounded={rounded}
              disabled={option.disabled}
              fullWidth={fullWidth}
              leftIcon={showIcons && option.icon}
              className={cn(
                positionClasses,
                !fullWidth && !isLast && "flex-1",
                buttonClassName,
                isSelected(option.id) && "ring-2 ring-offset-2 ring-blue-500"
              )}
              onClick={() => handleButtonClick(option)}
            >
              {option.label}
            </BasicButton>
          );
        })}
      </div>
    );
  }
);

GroupedButton.displayName = "GroupedButton";