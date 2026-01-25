"use client";

import { Button } from "@/components/ui/button";
import { Clock, Mail, Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BaseCardWrapper } from "@/components/global/cards/base-wrapper-card";

interface ComingSoonProps {
  title?: string;
  description?: string;
  launchDate?: string;
  showNotification?: boolean;
  customActions?: React.ReactNode;
}

export function ComingSoon({
  title = "Coming Soon",
  description = "We're working hard to bring you something amazing. Stay tuned!",
  launchDate,
  showNotification = true,
  customActions,
}: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="text-center space-y-8 p-10">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="p-6 rounded-full bg-primary/10">
          <Clock className="h-16 w-16 text-primary" />
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">{title}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
          {description}
        </p>
        
        {launchDate && (
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Expected Launch</p>
            <p className="text-lg font-semibold text-foreground">{launchDate}</p>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      {showNotification && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Be the first to know when we launch!
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button type="submit" className="whitespace-nowrap">
              <Bell className="h-4 w-4 mr-2" />
              Notify Me
            </Button>
          </form>
          
          {isSubscribed && (
            <p className="text-sm text-green-600 dark:text-green-400">
              ✓ Thanks for subscribing! We'll keep you updated.
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild variant="default">
          <Link href="/dashboard">
            Back to Dashboard
          </Link>
        </Button>
        
        <Button variant="outline" asChild>
          <Link href="mailto:support@example.com">
            <Mail className="h-4 w-4 mr-2" />
            Contact Us
          </Link>
        </Button>
      </div>

      {/* Custom Actions */}
      {customActions && (
        <div className="pt-4 border-t">
          {customActions}
        </div>
      )}

      {/* Social Links */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Follow us for updates</p>
        <div className="flex justify-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              Twitter
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}