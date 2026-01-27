"use client";

import React, { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Search, X, Loader2 } from "lucide-react";

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
                <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
              ) : (
                <Search className="h-4 w-4 text-gray-400" />
              )}
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled || loading}
              autoFocus={autoFocus}
              className={cn(
                "w-full h-10 pl-10 pr-10 rounded-md border border-gray-300 bg-white",
                "text-sm placeholder:text-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "hover:border-gray-400 transition-colors",
                inputClassName
              )}
            />

            {/* Clear Button */}
            {showClearButton && hasValue && !loading && (
              <button
                type="button"
                onClick={handleClear}
                disabled={disabled}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search Button */}
          {showSearchButton && (
            <button
              type="submit"
              disabled={disabled || loading || !hasValue}
              className={cn(
                "ml-2 h-10 px-4 rounded-md bg-blue-600 text-white text-sm font-medium",
                "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "transition-colors",
                buttonClassName
              )}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </button>
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

    const handleInputChange = (value: string) => {
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
    };

    const handleSuggestionClick = (suggestion: string) => {
      if (onSuggestionClick) {
        onSuggestionClick(suggestion);
      }
      setShowSuggestions(false);
    };

    return (
      <div ref={ref} className={cn("relative", className)}>
        <SearchForm
          {...props}
          onChange={(value) => {
            props.onChange?.(value);
            handleInputChange(value);
          }}
          showSearchButton={false}
        />
        
        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul className="py-1 max-h-60 overflow-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
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