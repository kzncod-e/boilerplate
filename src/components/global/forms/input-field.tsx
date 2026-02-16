"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date";

export interface InputFieldProps {
  name: string;
  label?: string;
  type?: InputType;
  value: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helper?: string;
  options?: { label: string; value: string }[];
  onChange: (name: string, value: any) => void;
  className?: string;
}

const errorClass = "border-destructive focus-visible:ring-destructive/20";

export default function InputField({
  name,
  label,
  type = "text",
  value,
  placeholder,
  required = false,
  disabled = false,
  error,
  helper,
  options = [],
  onChange,
  className,
}: InputFieldProps) {
  const inputId = `input-${name}`;
  const hasError = !!error;

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            id={inputId}
            name={name}
            value={value ?? ""}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={4}
            onChange={(e) => onChange(name, e.target.value)}
            className={cn(
              "min-h-[100px] resize-y",
              hasError && errorClass,
              className,
            )}
          />
        );

      case "select":
        return (
          <Select
            value={value ?? undefined}
            onValueChange={(v) => onChange(name, v)}
            disabled={disabled}
            required={required}
          >
            <SelectTrigger
              id={inputId}
              className={cn(hasError && errorClass, className)}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={inputId}
              checked={!!value}
              disabled={disabled}
              required={required}
              onCheckedChange={(checked) => onChange(name, !!checked)}
              className={cn(hasError && "border-destructive", className)}
            />
            {placeholder && (
              <Label
                htmlFor={inputId}
                className={cn(
                  "cursor-pointer font-normal",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
              >
                {placeholder}
              </Label>
            )}
          </div>
        );

      case "radio":
        return (
          <div className="flex flex-wrap items-center gap-4">
            {options.map((opt) => (
              <label
                key={opt.value}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium cursor-pointer text-foreground",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={value === opt.value}
                  required={required}
                  disabled={disabled}
                  onChange={() => onChange(name, opt.value)}
                  className="h-4 w-4 text-primary focus-visible:ring-ring/50 border-input"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id={inputId}
                type="button"
                variant="outline"
                disabled={disabled}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !value && "text-muted-foreground",
                  hasError && errorClass,
                  className,
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                {value instanceof Date
                  ? new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(value)
                  : (placeholder ?? "Pick a date")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={value instanceof Date ? value : undefined}
                onSelect={(date) => onChange(name, date ?? null)}
                disabled={disabled}
              />
            </PopoverContent>
          </Popover>
        );

      default:
        return (
          <Input
            id={inputId}
            type={type}
            name={name}
            value={value ?? ""}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            onChange={(e) =>
              onChange(
                name,
                type === "number" ? e.target.valueAsNumber : e.target.value,
              )
            }
            className={cn(hasError && errorClass, className)}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      {label && type !== "checkbox" && (
        <Label htmlFor={inputId} className={cn(disabled && "opacity-50")}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      {renderInput()}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {helper && !error && (
        <p className="text-sm text-muted-foreground">{helper}</p>
      )}
    </div>
  );
}
