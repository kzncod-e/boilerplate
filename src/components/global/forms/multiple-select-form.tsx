"use client";

import React, { forwardRef, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BasicButton } from "@/components/global/buttons/basic-button";
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

export interface MultipleSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultipleSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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

export const MultipleSelect = forwardRef<HTMLDivElement, MultipleSelectProps>(
  ({ 
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
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filter options based on search query
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !option.disabled
    );

    // Get selected option labels
    const selectedOptions = options.filter(option => 
      selectedValues.includes(option.value)
    );

    // Handle option selection
    const handleSelectOption = (value: string) => {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      
      onChange?.(newValues);
      setSearchQuery("");
    };

    // Adapter for Combobox onValueChange
    const handleComboboxValueChange = (value: string | string[]) => {
      const values = Array.isArray(value) ? value : [value];
      onChange?.(values);
    };

    // Handle clear all
    const handleClearAll = () => {
      onChange?.([]);
      setSearchQuery("");
    };

    // Handle remove single item
    const handleRemoveItem = (value: string) => {
      const newValues = selectedValues.filter(v => v !== value);
      onChange?.(newValues);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        {/* Label */}
        {props.children && (
          <Label className="mb-2 block">{props.children as React.ReactNode}</Label>
        )}

        <div ref={dropdownRef}>
          <Combobox
            items={filteredOptions.map(opt => opt.value)}
            multiple
            value={selectedValues}
            onValueChange={handleComboboxValueChange}
          >
            <ComboboxChips onClick={() => !disabled && setIsOpen(!isOpen)} className={cn("cursor-pointer", disabled && "cursor-not-allowed")}>
              <ComboboxValue>
                {selectedOptions.slice(0, maxVisibleItems).map((option) => (
                  <ComboboxChip
                    key={option.value}
                    onRemove={() => handleRemoveItem(option.value)}
                  >
                    {option.label}
                  </ComboboxChip>
                ))}
                
                {/* More items indicator */}
                {selectedOptions.length > maxVisibleItems && (
                  <span className="text-xs text-muted-foreground">
                    +{selectedOptions.length - maxVisibleItems} more
                  </span>
                )}

                {/* Search input */}
                {searchable && !disabled && (
                  <ComboboxChipsInput
                    placeholder={selectedValues.length === 0 ? placeholder : ""}
                    items={filteredOptions.map(opt => opt.value)}
                    multiple
                    value={selectedValues}
                    onValueChange={handleComboboxValueChange}
                  />
                )}
                
                {!searchable && selectedValues.length === 0 && (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
              </ComboboxValue>
            </ComboboxChips>

            {/* Dropdown arrow and clear button */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              {clearable && selectedValues.length > 0 && !disabled && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="h-6 w-6 p-0 hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
                className="h-6 w-6 p-0 hover:bg-muted"
              >
                <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
              </Button>
            </div>

            {/* Dropdown */}
            {isOpen && (
              <ComboboxContent>
                {filteredOptions.length === 0 ? (
                  <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
                ) : (
                  <ComboboxList>
                    {filteredOptions.map((option) => (
                      <ComboboxItem
                        key={option.value}
                        value={option.value}
                        selectedValue={selectedValues}
                        multiple
                        onValueChange={handleComboboxValueChange}
                      >
                        {option.label}
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

// Form field wrapper for consistency
export interface MultipleSelectFieldProps extends Omit<MultipleSelectProps, 'children'> {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
}

export const MultipleSelectField = forwardRef<HTMLDivElement, MultipleSelectFieldProps>(
  ({ label, error, helper, required, ...props }, ref) => {
    return (
      <div ref={ref} className="space-y-2">
        {label && (
          <Label>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        
        <MultipleSelect {...props} />
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        
        {helper && !error && (
          <p className="text-sm text-muted-foreground">{helper}</p>
        )}
      </div>
    );
  }
);

MultipleSelectField.displayName = "MultipleSelectField";