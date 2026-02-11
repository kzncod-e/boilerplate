import * as React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import GlobalCard from "./global-card";

export interface ScrollableCardProps {
    title?: string;
    description?: string;

    /** Main scrollable content */
    children: React.ReactNode;

    /** Footer content (optional) */
    footer?: React.ReactNode;

    /** Height of scroll area (number or tailwind class) */
    height?: number | string;

    /** Disable scroll */
    scrollable?: boolean;

    /** Extra class */
    className?: string;
}
export const ScrollableCard: React.FC<ScrollableCardProps> = ({
    title,
    description,
    children,
    footer,
    height = 300,
    scrollable = true,
    className,
}) => {
    return (
        <GlobalCard title={title}>
            {scrollable ? (
                <ScrollArea
                    className={cn(
                        typeof height === "number" ? `h-[${height}px]` : height,
                    )}
                >
                    <div className="p-4">{children}</div>
                </ScrollArea>
            ) : (
                <div className="p-4">{children}</div>
            )}

            {footer && <CardFooter className="border-t">{footer}</CardFooter>}
        </GlobalCard>
    );
};
