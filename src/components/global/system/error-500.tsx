"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { BaseCardWrapper } from "@/components/global/cards/base-wrapper-card";

interface Error500Props {
    title?: string;
    description?: string;
    errorId?: string;
    showRetry?: boolean;
    customActions?: React.ReactNode;
}

export function Error500({
    title = "500 - Internal Server Error",
    description = "Something went wrong on our end. Our team has been notified and is working on a fix.",
    errorId,
    showRetry = true,
    customActions,
}: Error500Props) {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="text-center space-y-6 flex flex-col items-center justify-center h-dvh -mt-10">
            {/* Error Icon */}
            <div className="flex justify-center">
                <div className="p-4 rounded-full bg-destructive/10">
                    <AlertTriangle className="h-12 w-12 text-destructive" />
                </div>
            </div>

            {/* Error Code */}
            <div className="text-6xl font-bold text-destructive">500</div>

            {/* Error Content */}
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-foreground">
                    {title}
                </h1>
                <p className="text-muted-foreground">{description}</p>
                {errorId && (
                    <p className="text-xs text-muted-foreground">
                        Error ID: {errorId}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="default">
                    <Link href="/dashboard">
                        <Home className="h-4 w-4 mr-2" />
                        Go Home
                    </Link>
                </Button>

                {showRetry && (
                    <Button variant="outline" onClick={handleRetry}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                )}
            </div>

            {/* Custom Actions */}
            {customActions && (
                <div className="pt-4 border-t">{customActions}</div>
            )}

            {/* Additional Help */}
            <div className="text-sm text-muted-foreground space-y-1">
                <p className="font-bold">If the problem persists, please:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Check your internet connection</li>
                    <li>Clear your browser cache</li>
                    <li>Contact our support team</li>
                </ul>
            </div>
        </div>
    );
}
