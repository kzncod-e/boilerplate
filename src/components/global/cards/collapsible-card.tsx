"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import GlobalCard from "./global-card";

interface CollapsibleCardProps {
    title: string;
    previewText?: string;
    expandedContent: React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
}

export function CollapsibleCard({
    title,
    previewText,
    expandedContent,
    defaultOpen = false,
    className,
}: CollapsibleCardProps) {
    const [isExpanded, setIsExpanded] = useState(defaultOpen);

    return (
        <GlobalCard title={title} className={className}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    {previewText && !isExpanded && (
                        <p className="text-sm text-muted-foreground ">
                            {previewText}
                        </p>
                    )}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="h-8 w-8 p-0 ml-4 flex-shrink-0"
                    aria-expanded={isExpanded}
                >
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </div>

            {isExpanded && (
                <div className="">
                    {typeof expandedContent === "string" ? (
                        <p className="text-sm text-foreground">
                            {expandedContent}
                        </p>
                    ) : (
                        expandedContent
                    )}
                </div>
            )}
        </GlobalCard>
    );
}
