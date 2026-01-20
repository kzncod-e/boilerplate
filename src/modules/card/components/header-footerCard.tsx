'use client'


import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { BaseCardWrapper } from './baseCard-wrapper'

interface TaskItem {
  label: string
  value: number
}

interface PrimaryAction {
  label: string
  onClick?: () => void
}

interface TaskCardProps {
  title: string
  description?: string
  items: TaskItem[]
  primaryAction?: PrimaryAction
  lastUpdated?: string
  className?: string
}

export function TaskCard({
  title,
  description,
  items,
  primaryAction,
  lastUpdated,
  className,
}: TaskCardProps) {
  return (
    <BaseCardWrapper className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Items List */}
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{item.label}</span>
              <span className="text-sm font-semibold text-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>

      {(primaryAction || lastUpdated) && (
        <CardFooter className="flex items-center justify-between pt-4 border-t border-border">
          {primaryAction && (
            <Button variant="default" size="sm" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
          {lastUpdated && (
            <p className="text-xs text-muted-foreground">{lastUpdated}</p>
          )}
        </CardFooter>
      )}
    </BaseCardWrapper>
  )
}

// Export old name for backward compatibility
export const HeaderFooterCard = TaskCard
