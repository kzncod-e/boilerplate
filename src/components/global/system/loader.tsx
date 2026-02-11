"use client";

import { Loader2 } from "lucide-react";

interface LoaderProps {
    size?: "sm" | "md" | "lg";
    text?: string;
    className?: string;
    fullScreen?: boolean;
}

export function Loader({
    size = "md",
    text,
    className = "",
    fullScreen = false,
}: LoaderProps) {
    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
    };

    const containerClasses = fullScreen
        ? "min-h-screen flex items-center justify-center"
        : "flex items-center justify-center";

    return (
        <div className={`${containerClasses} ${className}`}>
            <div className="flex flex-col items-center gap-4">
                <Loader2
                    className={`animate-spin text-primary ${sizeClasses[size]}`}
                />
                {text && (
                    <p className="text-sm text-muted-foreground animate-pulse">
                        {text}
                    </p>
                )}
            </div>
        </div>
    );
}

// Page loader component for full-page loading states
export function PageLoader({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-lg text-muted-foreground">{text}</p>
            </div>
        </div>
    );
}

// Inline loader for smaller components
export function InlineLoader({ text }: { text?: string }) {
    return (
        <div className="flex items-center gap-2 py-4">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            {text && (
                <span className="text-sm text-muted-foreground">{text}</span>
            )}
        </div>
    );
}

// Skeleton loader for content placeholders
export function SkeletonLoader() {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
        </div>
    );
}

// Card skeleton loader
export function CardSkeletonLoader() {
    return (
        <div className="rounded-lg border bg-card p-6 space-y-4 animate-pulse">
            <div className="h-6 bg-muted rounded w-1/3"></div>
            <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
            <div className="h-10 bg-muted rounded w-1/4"></div>
        </div>
    );
}

// Table skeleton loader
export function TableSkeletonLoader({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-2">
            {Array.from({ length: rows }).map((_, index) => (
                <div
                    key={index}
                    className="flex gap-4 p-4 border rounded animate-pulse"
                >
                    <div className="h-4 bg-muted rounded flex-1"></div>
                    <div className="h-4 bg-muted rounded flex-1"></div>
                    <div className="h-4 bg-muted rounded flex-1"></div>
                    <div className="h-4 bg-muted rounded w-20"></div>
                </div>
            ))}
        </div>
    );
}
