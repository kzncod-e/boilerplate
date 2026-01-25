"use client";

import { Button } from "@/components/ui/button";
import { Home, Settings, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BaseCardWrapper } from "../cards/base-wrapper-card";

interface UnderMaintenanceProps {
  title?: string;
  description?: string;
  estimatedTime?: string;
  showProgress?: boolean;
  progress?: number;
  showNotification?: boolean;
  customActions?: React.ReactNode;
}

export function UnderMaintenance({
  title = "Under Maintenance",
  description = "We're currently performing scheduled maintenance to improve our service. We'll be back shortly!",
  estimatedTime = "1 Day",
  showProgress = true,
  progress = 65,
  showNotification = true,
  customActions,
}: UnderMaintenanceProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="text-center space-y-6 flex flex-col items-center justify-center h-dvh -mt-10">
      {/* Maintenance Icon */}
      <div className="flex justify-center w-full">
        <div className="p-6 rounded-full bg-white dark:bg-orange-900/30 animate-pulse">
          <Settings className="animate-spin animate-ease-in-out animate-infinite animate-duration-150 h-16 w-16 text-primary dark:text-orange-400" />
        </div>
      </div>
      
      {/* Content */}
      <div className="text-center space-y-5">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          {description}
        </p>
        
        {estimatedTime && (
          <div className="px-10 p-4 border-b">
            <p className="text-sm text-muted-foreground">Estimated Time</p>
            <p className="text-lg font-semibold text-foreground">{estimatedTime}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" className="bg-white dark:bg-transparent" onClick={() => setShowDetails(!showDetails)}>
          <Lightbulb className="h-4 w-4" />
          {showDetails ? 'Hide Details' : "What's New"}
        </Button>
        
        <Button asChild variant="default">
          <Link href="/dashboard">
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Link>
        </Button>
      </div>

      {/* Custom Actions */}
      {customActions && (
        <div className="pt-4 border-t">
          {customActions}
        </div>
      )}

      {/* Additional Info */}
      {showDetails && (
        <BaseCardWrapper>
            <p className="text-sm font-bold">What we're working on:</p>
            <ul className="list-disc list-inside space-y-1 max-w-md mx-auto text-left text-sm">
              <li>Performance improvements</li>
              <li>New features and enhancements</li>
              <li>Security updates</li>
              <li>Bug fixes and optimizations</li>
            </ul>
        </BaseCardWrapper>
      )}
    </div>
  );
}