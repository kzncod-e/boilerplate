"use client";

import React, { forwardRef, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, ChevronDown, Check } from "lucide-react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox";

/* =========================================================
 * Types
 * ======================================================= */

export interface MultipleSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultipleSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: MultipleSelectOption[];
  selectedValues?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  maxVisibleItems?: number;
  emptyMessage?: string;
}

/* =========================================================
 * Component
 * ======================================================= */

// Helper component to accept Combobox props without passing them to DOM
const ComboboxActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    items?: string[]
    multiple?: boolean
    value?: string | string[]
    onValueChange?: (value: string | string[]) => void
  }
>(({ className, children, items, multiple, value, onValueChange, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));
ComboboxActions.displayName = "ComboboxActions";

export const MultipleSelect = forwardRef<HTMLDivElement, MultipleSelectProps>(
  (
    {
      options,
      selectedValues = [],
      onChange,
      placeholder = "Select options...",
      disabled = false,
      searchable = true,
      clearable = true,
      maxVisibleItems = 5,
      emptyMessage = "No options available",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    /* -----------------------------
     * Filter
     * ---------------------------- */
    const filteredOptions = options.filter(
      (opt) =>
        !opt.disabled &&
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedOptions = options.filter((opt) =>
      selectedValues.includes(opt.value)
    );

    /* -----------------------------
     * Handlers
     * ---------------------------- */
    const toggleValue = (value: string) => {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];

      onChange?.(newValues);
      setSearchQuery("");
    };

    const removeValue = (value: string) => {
      onChange?.(selectedValues.filter((v) => v !== value));
    };

    const clearAll = () => {
      onChange?.([]);
      setSearchQuery("");
    };

    /* -----------------------------
     * Click outside
     * ---------------------------- */
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* -----------------------------
     * Render
     * ---------------------------- */
    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        {children && <Label className="mb-2 block">{children}</Label>}

        <div ref={dropdownRef}>
          <Combobox items={filteredOptions.map((o) => o.value)} multiple>
            <ComboboxChips
              className={cn(
                "cursor-pointer",
                disabled && "cursor-not-allowed"
              )}
              onClick={() => !disabled && setIsOpen((v) => !v)}
            >
              <ComboboxValue>
                {selectedOptions.slice(0, maxVisibleItems).map((opt) => (
                  <ComboboxChip
                    key={opt.value}
                    onRemove={() => removeValue(opt.value)}
                  >
                    {opt.label}
                  </ComboboxChip>
                ))}

                {selectedOptions.length > maxVisibleItems && (
                  <span className="text-xs text-muted-foreground">
                    +{selectedOptions.length - maxVisibleItems} more
                  </span>
                )}

                {searchable && !disabled && (
                  <ComboboxChipsInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      selectedValues.length === 0 ? placeholder : ""
                    }
                  />
                )}

                {!searchable && selectedValues.length === 0 && (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
              </ComboboxValue>
            </ComboboxChips>

            {/* actions */}
            <ComboboxActions className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {clearable && selectedValues.length > 0 && !disabled && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={clearAll}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                disabled={disabled}
                onClick={() => setIsOpen((v) => !v)}
              >
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </Button>
            </ComboboxActions>

            {/* dropdown */}
            {isOpen && (
              <ComboboxContent>
                {filteredOptions.length === 0 ? (
                  <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
                ) : (
                  <ComboboxList>
                    {filteredOptions.map((opt) => (
                      <ComboboxItem
                        key={opt.value}
                        value={opt.value}
                        selectedValue={selectedValues}
                        multiple
                        onValueChange={() => toggleValue(opt.value)} // ✅ FIX
                      >
                        <div className="flex items-center gap-2">
                          <Check
                            className={cn(
                              "h-4 w-4",
                              selectedValues.includes(opt.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {opt.label}
                        </div>
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                )}
              </ComboboxContent>
            )}
          </Combobox>
        </div>
      </div>
    );
  }
);

MultipleSelect.displayName = "MultipleSelect";

/* =========================================================
 * Field Wrapper
 * ======================================================= */

export interface MultipleSelectFieldProps
  extends Omit<MultipleSelectProps, "children"> {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
}

export const MultipleSelectField = forwardRef<
  HTMLDivElement,
  MultipleSelectFieldProps
>(({ label, error, helper, required, ...props }, ref) => {
  return (
    <div ref={ref} className="space-y-2">
      {label && (
        <Label>
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      )}

      <MultipleSelect {...props} />

      {error && <p className="text-sm text-destructive">{error}</p>}
      {helper && !error && (
        <p className="text-sm text-muted-foreground">{helper}</p>
      )}
    </div>
  );
});

MultipleSelectField.displayName = "MultipleSelectField";
