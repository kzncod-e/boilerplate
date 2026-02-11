"use client";

import { Button } from "@/components/ui/button";
import {
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { BaseCardWrapper } from "./base-wrapper-card";
import GlobalCard from "./global-card";

interface TaskItem {
    label: string;
    value: number;
}

interface PrimaryAction {
    label: string;
    onClick?: () => void;
}

interface TaskCardProps {
    title: string;
    description?: string;
    items: TaskItem[];
    primaryAction?: PrimaryAction;
    lastUpdated?: string;
    className?: string;
}

export function TaskCard({
    title,
    description,
    items,
    primaryAction,
    lastUpdated,
    className,
}: TaskCardProps) {
    return (
        <GlobalCard
            title={title}
            description={description}
            className={className}
        >
            {/* Items List */}
            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between"
                    >
                        <span className="text-sm text-foreground">
                            {item.label}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>

            {(primaryAction || lastUpdated) && (
                <CardFooter className="flex items-center justify-between pt-4 border-t border-border">
                    {primaryAction && (
                        <Button
                            variant="default"
                            size="sm"
                            onClick={primaryAction.onClick}
                        >
                            {primaryAction.label}
                        </Button>
                    )}
                    {lastUpdated && (
                        <p className="text-xs text-muted-foreground">
                            {lastUpdated}
                        </p>
                    )}
                </CardFooter>
            )}
        </GlobalCard>
    );
}

// Export old name for backward compatibility
export const HeaderFooterCard = TaskCard;
