"use client";

import { Button } from "@/components/ui/button";
import { Server, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { BaseCardWrapper } from "@/components/global/cards/base-wrapper-card";

interface Error503Props {
    title?: string;
    description?: string;
    estimatedTime?: string;
    showRetry?: boolean;
    customActions?: React.ReactNode;
}

export function Error503({
    title = "503 - Service Unavailable",
    description = "Our servers are temporarily down for maintenance. We'll be back shortly!",
    estimatedTime,
    showRetry = true,
    customActions,
}: Error503Props) {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="text-center space-y-6 flex flex-col items-center justify-center h-dvh -mt-10">
            {/* Error Icon */}
            <div className="flex justify-center">
                <div className="p-4 rounded-full bg-orange-100 dark:bg-orange-900/20">
                    <Server className="h-12 w-12 text-orange-600 dark:text-orange-400" />
                </div>
            </div>

            {/* Error Code */}
            <div className="text-6xl font-bold text-orange-600 dark:text-orange-400">
                503
            </div>

            {/* Error Content */}
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-foreground">
                    {title}
                </h1>
                <p className="text-muted-foreground">{description}</p>
                {estimatedTime && (
                    <p className="text-sm text-muted-foreground">
                        Estimated downtime: {estimatedTime}
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

            {/* Additional Info */}
            <div className="text-sm text-muted-foreground space-y-2">
                <p>
                    We're currently performing scheduled maintenance to improve
                    our service.
                </p>
                <p className="font-semibold">You can also:</p>
                <ul className="list-disc list-inside text-xs space-y-1">
                    <li>Check our status page for updates</li>
                    <li>Follow us on social media</li>
                    <li>Contact support if urgent</li>
                </ul>
            </div>
        </div>
    );
}
