"use client";

import { Button } from "@/components/ui/button";
import { Cable, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

interface Error404Props {
    title?: string;
    description?: string;
    showRetry?: boolean;
    customActions?: React.ReactNode;
}

export function Error404({
    title = "Page Not Found",
    description = "The page you're looking for doesn't exist or has been moved.",
    showRetry = true,
    customActions,
}: Error404Props) {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="text-center space-y-6 flex flex-col items-center justify-center h-dvh -mt-10">
            {/* Error Icon */}
            <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20">
                    <Cable className="h-12 w-12 text-primary dark:text-primary-400" />
                </div>
            </div>

            {/* Error Code */}
            <div className="text-7xl font-bold text-primary">404</div>

            {/* Error Content */}
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-foreground">
                    {title}
                </h1>
                <p className="text-muted-foreground">{description}</p>
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
            <div className="text-sm text-muted-foreground">
                If you think this is an error, please contact our support team.
            </div>
        </div>
    );
}
