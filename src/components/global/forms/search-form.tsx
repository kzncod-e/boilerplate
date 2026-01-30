"use client";

import React, { useState, forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { BasicButton } from "@/components/global/buttons/basic-button";

export interface SearchFormProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  showClearButton?: boolean;
  showSearchButton?: boolean;
  debounceMs?: number;
  autoFocus?: boolean;
}

export const SearchForm = forwardRef<HTMLDivElement, SearchFormProps>(
  (
    {
      value = "",
      onChange,
      onSearch,
      onClear,
      placeholder = "Search...",
      disabled = false,
      loading = false,
      className,
      inputClassName,
      buttonClassName,
      showClearButton = true,
      showSearchButton = true,
      debounceMs = 300,
      autoFocus = false,
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = useState(value);
    const [debouncedValue, setDebouncedValue] = useState(value);

    // Update local state when prop value changes
    React.useEffect(() => {
      setSearchValue(value);
    }, [value]);

    // Debounce search value
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(searchValue);
      }, debounceMs);

      return () => clearTimeout(timer);
    }, [searchValue, debounceMs]);

    // Trigger search when debounced value changes
    React.useEffect(() => {
      if (onChange) {
        onChange(debouncedValue);
      }
    }, [debouncedValue, onChange]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    };

    const handleSearch = (e?: React.FormEvent) => {
      e?.preventDefault();
      if (onSearch) {
        onSearch(searchValue);
      } else if (onChange) {
        onChange(searchValue);
      }
    };

    const handleClear = () => {
      setSearchValue("");
      if (onClear) {
        onClear();
      } else if (onChange) {
        onChange("");
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    const hasValue = searchValue.trim().length > 0;

    return (
      <div ref={ref} className={cn("relative", className)}>
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative flex-1">
            {/* Search Icon */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <Search className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            {/* Input Field */}
            <Input
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled || loading}
              autoFocus={autoFocus}
              className={cn(
                "pl-10 pr-10",
                inputClassName
              )}
            />

            {/* Clear Button */}
            {showClearButton && hasValue && !loading && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                disabled={disabled}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Search Button */}
          {showSearchButton && (
            <BasicButton
              type="submit"
              variant="primary"
              size="md"
              disabled={disabled || loading || !hasValue}
              loading={loading}
              className={cn("ml-2", buttonClassName)}
            >
              <Search className="h-4 w-4" />
            </BasicButton>
          )}
        </form>
      </div>
    );
  }
);

SearchForm.displayName = "SearchForm";

export interface QuickSearchProps extends Omit<SearchFormProps, "showSearchButton" | "showClearButton"> {
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  maxSuggestions?: number;
}

export const QuickSearch = forwardRef<HTMLDivElement, QuickSearchProps>(
  (
    {
      suggestions = [],
      onSuggestionClick,
      maxSuggestions = 5,
      className,
      ...props
    },
    ref
  ) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

    const handleInputChange = useCallback((value: string) => {
      if (value.trim().length > 0) {
        const filtered = suggestions
          .filter(suggestion => 
            suggestion.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, maxSuggestions);
        
        setFilteredSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    }, [suggestions, maxSuggestions]);

    const handleSuggestionClick = useCallback((suggestion: string) => {
      if (onSuggestionClick) {
        onSuggestionClick(suggestion);
      }
      setShowSuggestions(false);
    }, [onSuggestionClick]);

    const memoizedOnChange = useCallback((value: string) => {
      props.onChange?.(value);
      handleInputChange(value);
    }, [props.onChange, handleInputChange]);

    return (
      <div ref={ref} className={cn("relative", className)}>
        <SearchForm
          {...props}
          onChange={memoizedOnChange}
          showSearchButton={false}
        />
        
        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border rounded-md shadow-lg p-1">
            <div className="max-h-60 overflow-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="ghost"
                  className="w-full justify-start h-auto py-2 px-3"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Click outside to close suggestions */}
        {showSuggestions && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowSuggestions(false)}
          />
        )}
      </div>
    );
  }
);

QuickSearch.displayName = "QuickSearch";
