"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

const Combobox = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    items: string[]
    multiple?: boolean
    value?: string | string[]
    onValueChange?: (value: string | string[]) => void
  }
>(({ className, items, multiple = false, value, onValueChange, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            items,
            multiple,
            value,
            onValueChange,
          } as any)
        }
        return child
      })}
    </div>
  )
})
Combobox.displayName = "Combobox"

const ComboboxChips = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-wrap gap-1 items-center min-h-[20px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
ComboboxChips.displayName = "ComboboxChips"

const ComboboxChip = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    onRemove?: () => void
  }
>(({ className, children, onRemove, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground",
      className
    )}
    {...props}
  >
    {children}
    {onRemove && (
      <button
        type="button"
        onClick={onRemove}
        className="hover:bg-primary-foreground/20 rounded-full p-0.5 transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    )}
  </span>
))
ComboboxChip.displayName = "ComboboxChip"

const ComboboxChipsInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    items?: string[]
    multiple?: boolean
    value?: string | string[]
    onValueChange?: (value: string | string[]) => void
  }
>(({ className, placeholder, items = [], multiple = false, value, onValueChange, ...props }, ref) => {
  const [inputValue, setInputValue] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      if (multiple) {
        const currentValues = Array.isArray(value) ? value : []
        if (!currentValues.includes(inputValue.trim())) {
          onValueChange?.([...currentValues, inputValue.trim()])
        }
      } else {
        onValueChange?.(inputValue.trim())
      }
      setInputValue("")
    } else if (e.key === "Backspace" && inputValue === "" && multiple && Array.isArray(value) && value.length > 0) {
      const newValues = value.slice(0, -1)
      onValueChange?.(newValues)
    }
  }

  return (
    <>
      <input
        ref={ref}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className={cn(
          "flex-1 min-w-[60px] border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 outline-none",
          className
        )}
        {...props}
      />
    </>
  )
})
ComboboxChipsInput.displayName = "ComboboxChipsInput"

const ComboboxValue = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    items?: string[]
    multiple?: boolean
    value?: string | string[]
    onValueChange?: (value: string | string[]) => void
  }
>(({ className, children, items = [], multiple = false, value, onValueChange, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex-1", className)} {...props}>
      {children}
    </div>
  )
})
ComboboxValue.displayName = "ComboboxValue"

const ComboboxContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    items?: string[]
    multiple?: boolean
    value?: string | string[]
    onValueChange?: (value: string | string[]) => void
  }
>(({ className, children, items = [], multiple = false, value, onValueChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md max-h-60 overflow-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
ComboboxContent.displayName = "ComboboxContent"

const ComboboxEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-3 py-2 text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </div>
))
ComboboxEmpty.displayName = "ComboboxEmpty"

const ComboboxList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    items?: string[]
    multiple?: boolean
    value?: string | string[]
    onValueChange?: (value: string | string[]) => void
  }
>(({ className, children, items = [], multiple = false, value, onValueChange, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("py-1", className)} {...props}>
      {typeof children === "function" ? children(items) : children}
    </div>
  )
})
ComboboxList.displayName = "ComboboxList"

const ComboboxItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string
    items?: string[]
    multiple?: boolean
    selectedValue?: string | string[]
    onValueChange?: (value: string | string[]) => void
  }
>(({ className, children, value, items = [], multiple = false, selectedValue, onValueChange, ...props }, ref) => {
  const isSelected = multiple 
    ? Array.isArray(selectedValue) && selectedValue.includes(value)
    : selectedValue === value

  const handleClick = () => {
    if (multiple) {
      const currentValues = Array.isArray(selectedValue) ? selectedValue : []
      if (isSelected) {
        onValueChange?.(currentValues.filter(v => v !== value))
      } else {
        onValueChange?.([...currentValues, value])
      }
    } else {
      onValueChange?.(value)
    }
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        isSelected && "bg-accent/50 text-accent-foreground",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 flex-1">
        {multiple && (
          <div className={cn(
            "h-4 w-4 rounded border border-primary",
            isSelected && "bg-primary border-primary"
          )}>
            {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
          </div>
        )}
        <span>{children}</span>
      </div>
    </div>
  )
})
ComboboxItem.displayName = "ComboboxItem"

const ComboboxInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
))
ComboboxInput.displayName = "ComboboxInput"

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
}
