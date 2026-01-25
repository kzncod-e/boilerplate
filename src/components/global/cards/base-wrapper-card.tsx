import React from "react"
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

interface BaseCardWrapperProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
}

const paddingMap = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function BaseCardWrapper({
  children,
  className,
  padding = 'md',
  hover = true,
}: BaseCardWrapperProps) {
  return (
    <Card
      className={cn(
        paddingMap[padding],
        'bg-white rounded-lg shadow-xl',
        hover && 'hover:shadow-md transition-shadow duration-200',
        className
      )}
    >
      {children}
    </Card>
  )
}
