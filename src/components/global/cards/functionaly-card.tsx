"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Settings, Edit, Copy, Download, X, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type OptionMode = "dropdown" | "popover" | "expand" | "inline";

interface FunctionalCardProps {
    title: string | React.ReactNode;
    className?: string;
    description?: string;
    children: React.ReactNode;
    optionMode?: OptionMode;
    options?: {
        setting?: boolean;
        edit?: boolean;
        copy?: boolean;
        download?: boolean;
        custom?: Array<{
            label: string;
            icon?: React.ReactNode;
            onClick: () => void;
            variant?: "default" | "destructive";
        }>;
    };
    onSetting?: () => void;
    onEdit?: () => void;
    onCopy?: (content: string) => void;
    onDownload?: () => void;
}

const FunctionalCard = ({
    title,
    className,
    description,
    children,
    optionMode = "dropdown",
    options = {
        setting: true,
        edit: true,
        copy: true,
        download: true,
    },
    onSetting,
    onEdit,
    onCopy,
    onDownload,
}: FunctionalCardProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showCopyTooltip, setShowCopyTooltip] = useState(false);

    const handleAction = (action: () => void) => {
        action();
        if (optionMode === "popover") {
            setIsPopoverOpen(false);
        }
    };

    const handleCopy = async () => {
        try {
            // Get card content as text
            const cardElement = document.querySelector('[data-card-content]');
            let contentToCopy = '';
            
            if (cardElement) {
                contentToCopy = cardElement.textContent || '';
            } else {
                // Fallback: get title and description
                contentToCopy = `${title} ${description || ''}`;
            }
            
            // Copy to clipboard
            await navigator.clipboard.writeText(contentToCopy.trim());
            
            // Show tooltip
            setShowCopyTooltip(true);
            setTimeout(() => setShowCopyTooltip(false), 2000);
            
            // Call custom onCopy if provided
            onCopy?.(contentToCopy.trim());
        } catch (error) {
            console.error('Failed to copy content:', error);
        }
    };

    const hasOptions = 
        options.setting || 
        options.edit || 
        options.copy || 
        options.download || 
        (options.custom && options.custom.length > 0);

    const renderOptionButton = (onClick: () => void, icon: React.ReactNode, label: string, variant: "default" | "destructive" = "default") => (
        <div className="relative">
            <Button
                variant="ghost"
                size="sm"
                onClick={onClick}
                className={cn(
                    "h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800",
                    variant === "destructive" && "text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                )}
                title={label}
            >
                {icon}
            </Button>
            {label === "Copy" && showCopyTooltip && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
                    Copied!
                </div>
            )}
        </div>
    );

    const optionsContent = (
        <div className="flex items-center gap-1">
            {options.setting && (
                renderOptionButton(
                    () => handleAction(() => onSetting?.()),
                    <Settings className="h-4 w-4" />,
                    "Settings"
                )
            )}
            
            {options.edit && (
                renderOptionButton(
                    () => handleAction(() => onEdit?.()),
                    <Edit className="h-4 w-4" />,
                    "Edit"
                )
            )}
            
            {options.copy && (
                renderOptionButton(
                    () => handleAction(handleCopy),
                    <Copy className="h-4 w-4" />,
                    "Copy"
                )
            )}
            
            {options.download && (
                renderOptionButton(
                    () => handleAction(() => onDownload?.()),
                    <Download className="h-4 w-4" />,
                    "Download"
                )
            )}
            
            {options.custom?.map((item, index) => (
                <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction(item.onClick)}
                    className={cn(
                        "h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800",
                        item.variant === "destructive" && "text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    )}
                    title={item.label}
                >
                    {item.icon}
                </Button>
            ))}
        </div>
    );

    const renderDropdownContent = () => (
        <>
            {options.setting && (
                <DropdownMenuItem onClick={() => handleAction(() => onSetting?.())}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </DropdownMenuItem>
            )}
            
            {options.edit && (
                <DropdownMenuItem onClick={() => handleAction(() => onEdit?.())}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
            )}
            
            {options.copy && (
                <DropdownMenuItem onClick={() => handleAction(handleCopy)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                </DropdownMenuItem>
            )}
            
            {options.download && (
                <DropdownMenuItem onClick={() => handleAction(() => onDownload?.())}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </DropdownMenuItem>
            )}
            
            {options.custom && options.custom.length > 0 && (
                <>
                    {(options.setting || options.edit || options.copy || options.download) && (
                        <DropdownMenuSeparator />
                    )}
                    {options.custom.map((item, index) => (
                        <DropdownMenuItem
                            key={index}
                            onClick={() => handleAction(item.onClick)}
                            className={cn(
                                item.variant === "destructive" && "text-red-600 focus:text-red-600"
                            )}
                        >
                            {item.icon && <span className="mr-2 h-4 w-4">{item.icon}</span>}
                            {item.label}
                        </DropdownMenuItem>
                    ))}
                </>
            )}
        </>
    );

    return (
        <Card
            className={cn(
                "border-0 shadow-xl shadow-blue-400/5 h-auto relative transition-all duration-300",
                isExpanded && "lg:col-span-2",
                className,
            )}
        >
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="tracking-tight flex items-center gap-3 font-semibold text-xl text-primary">
                            {title}
                        </CardTitle>
                        {description && (
                            <CardDescription className="text-sm mt-2">
                                {description}
                            </CardDescription>
                        )}
                    </div>
                    
                    {hasOptions && (
                        <div className="flex items-center gap-2">
                            {optionMode === "inline" && optionsContent}
                            
                            {optionMode === "expand" && isExpanded && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsExpanded(false)}
                                    className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    title="Collapse options"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                            
                            {optionMode === "dropdown" ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        {renderDropdownContent()}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : optionMode === "popover" ? (
                                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="end" className="w-auto p-2">
                                        {optionsContent}
                                    </PopoverContent>
                                </Popover>
                            ) : optionMode === "expand" ? (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className={cn(
                                        "h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                                    )}
                                    title={isExpanded ? "Collapse options" : "Expand options"}
                                >
                                    {isExpanded ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </Button>
                            ) : null}
                        </div>
                    )}
                </div>
                
                {/* Expand Mode - Horizontal Options Bar */}
                {optionMode === "expand" && isExpanded && (
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Actions</span>
                            {optionsContent}
                        </div>
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-4 pt-0" data-card-content>{children}</CardContent>
        </Card>
    );
};

export default FunctionalCard;