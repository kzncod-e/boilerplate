import React from "react"
import { cn } from '@/lib/utils'

interface CardGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
}

export function CardGrid({
  children,
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
}: CardGridProps) {
  const colMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }

  const gridClasses = cn(
    'grid gap-6',
    colMap[cols.mobile?cols.mobile:1] || 'grid-cols-1',
    `md:${colMap[cols.tablet?cols.tablet:2] || 'md:grid-cols-2'}`,
    `lg:${colMap[cols.desktop?cols.desktop:3] || 'lg:grid-cols-3'}`
  )

  return (
    <div className={cn('max-w-7xl mx-auto', className)}>
      <div className={gridClasses}>
        {children}
      </div>
    </div>
  )
}
