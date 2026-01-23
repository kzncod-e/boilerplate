import React from "react";

import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Type as type, LucideIcon } from "lucide-react";
import { BaseCardWrapper } from "./basecard-wrapper";
import GlobalCard from "./global-card";

interface HeaderCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  footerText?: string;
  className?: string;
}

export function HeaderCard({
  icon: Icon,
  title,
  description,
  leftContent,
  rightContent,
  footerText,
  className,
}: HeaderCardProps) {
  return (
    <GlobalCard className={className} title={title} description={description}>
      {/* Content Layout */}
      {leftContent && rightContent ? (
        <div className="grid grid-cols-2 gap-6">
          <div>{leftContent}</div>
          <div>{rightContent}</div>
        </div>
      ) : leftContent ? (
        <div>{leftContent}</div>
      ) : rightContent ? (
        <div>{rightContent}</div>
      ) : null}

      {/* Footer Text */}
      {footerText && (
        <p className="text-xs text-muted-foreground pt-2">{footerText}</p>
      )}
    </GlobalCard>
  );
}
