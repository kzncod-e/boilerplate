"use client";

import React, { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export type DatePickerMode = "single" | "range";
export type CalendarView = "month" | "year";

export interface DatePickerProps {
  mode?: DatePickerMode;
  value?: Date | [Date | null, Date | null] | null;
  onChange?: (value: Date | [Date | null, Date | null] | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showTwoCalendars?: boolean;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      mode = "single",
      value,
      onChange,
      placeholder = "Select date",
      disabled = false,
      className,
      showTwoCalendars = false,
      minDate,
      maxDate,
      format = "MMM dd, yyyy",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentMonth2, setCurrentMonth2] = useState(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
    };

    const formatDisplayValue = () => {
      if (!value) return placeholder;
      
      if (mode === "single" && value instanceof Date) {
        return formatDate(value);
      }
      
      if (mode === "range" && Array.isArray(value)) {
        const [start, end] = value;
        if (start && end) {
          return `${formatDate(start)} - ${formatDate(end)}`;
        } else if (start) {
          return `${formatDate(start)} - ...`;
        }
      }
      
      return placeholder;
    };

    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const isDateDisabled = (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    const isDateSelected = (date: Date) => {
      if (mode === "single" && value instanceof Date) {
        return date.toDateString() === value.toDateString();
      }
      
      if (mode === "range" && Array.isArray(value)) {
        const [start, end] = value;
        if (start && end) {
          return date >= start && date <= end;
        } else if (start) {
          return date.toDateString() === start.toDateString();
        }
      }
      
      return false;
    };

    const isDateRangeStart = (date: Date) => {
      if (mode === "range" && Array.isArray(value) && value[0]) {
        return date.toDateString() === value[0].toDateString();
      }
      return false;
    };

    const isDateRangeEnd = (date: Date) => {
      if (mode === "range" && Array.isArray(value) && value[1]) {
        return date.toDateString() === value[1].toDateString();
      }
      return false;
    };

    const handleDateClick = (date: Date) => {
      if (disabled || isDateDisabled(date)) return;

      if (mode === "single") {
        onChange?.(date);
        setIsOpen(false);
      } else if (mode === "range") {
        const currentRange = Array.isArray(value) ? value : [null, null];
        
        if (!currentRange[0] || (currentRange[0] && currentRange[1])) {
          // Start new range
          onChange?.([date, null]);
        } else {
          // Complete range
          const [start] = currentRange;
          if (date >= start) {
            onChange?.([start, date]);
          } else {
            onChange?.([date, start]);
          }
          setIsOpen(false);
        }
      }
    };

    const navigateMonth = (direction: number, calendarIndex: number = 0) => {
      if (calendarIndex === 0) {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(newMonth.getMonth() + direction);
        setCurrentMonth(newMonth);
        
        if (showTwoCalendars) {
          const newMonth2 = new Date(newMonth);
          newMonth2.setMonth(newMonth2.getMonth() + 1);
          setCurrentMonth2(newMonth2);
        }
      } else if (calendarIndex === 1 && showTwoCalendars) {
        const newMonth2 = new Date(currentMonth2);
        newMonth2.setMonth(newMonth2.getMonth() + direction);
        setCurrentMonth2(newMonth2);
      }
    };

    const renderCalendar = (month: Date, calendarIndex: number = 0) => {
      const daysInMonth = getDaysInMonth(month);
      const firstDay = getFirstDayOfMonth(month);
      const days: React.ReactNode[] = [];
      
      // Day headers
      const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      
      // Empty cells for days before month starts
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-8" />);
      }
      
      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(month.getFullYear(), month.getMonth(), day);
        const disabled = isDateDisabled(date);
        const selected = isDateSelected(date);
        const isRangeStart = isDateRangeStart(date);
        const isRangeEnd = isDateRangeEnd(date);
        
        days.push(
          <button
            key={day}
            type="button"
            disabled={disabled}
            onClick={() => handleDateClick(date)}
            className={cn(
              "h-8 w-8 rounded-md text-sm font-medium transition-colors",
              "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500",
              disabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
              selected && !isRangeStart && !isRangeEnd && "bg-blue-500 text-white hover:bg-blue-600",
              isRangeStart && "bg-blue-500 text-white rounded-r-md",
              isRangeEnd && "bg-blue-500 text-white rounded-l-md",
              !selected && !disabled && "text-gray-900"
            )}
          >
            {day}
          </button>
        );
      }
      
      return (
        <div className="p-3">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigateMonth(-1, calendarIndex)}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <div className="text-sm font-medium text-gray-900">
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                year: "numeric",
              }).format(month)}
            </div>
            
            <button
              type="button"
              onClick={() => navigateMonth(1, calendarIndex)}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayHeaders.map((day) => (
              <div key={day} className="h-8 text-xs font-medium text-gray-500 text-center">
                {day}
              </div>
            ))}
          </div>
          
          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days}
          </div>
        </div>
      );
    };

    return (
      <div ref={ref} className={cn("relative", className)}>
        {/* Input Field */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-left",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "hover:border-gray-400 transition-colors",
            className
          )}
        >
          <span className={cn(!value && "text-gray-500")}>
            {formatDisplayValue()}
          </span>
          <Calendar className="h-4 w-4 text-gray-400" />
        </button>
        
        {/* Calendar Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className={cn(
              "p-2",
              showTwoCalendars && "flex gap-2"
            )}>
              {renderCalendar(currentMonth, 0)}
              {showTwoCalendars && renderCalendar(currentMonth2, 1)}
            </div>
          </div>
        )}
        
        {/* Click outside to close */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";