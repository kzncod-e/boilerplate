import React from "react"

import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Type as type, LucideIcon } from 'lucide-react'
import { BaseCardWrapper } from "./baseCard-wrapper"

interface HeaderCardProps {
  icon?: LucideIcon
  title: string
  description: string
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
  footerText?: string
  className?: string
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
    <BaseCardWrapper className={className} padding="lg">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              {Icon && <Icon className="w-5 h-5" />}
              {title}
            </CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
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
      </CardContent>
    </BaseCardWrapper>
  )
}
