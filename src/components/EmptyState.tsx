import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  children?: ReactNode
}

export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-1 py-24 text-center">
      <p className="text-lg font-semibold text-neutral-900">{title}</p>
      {description && <p className="text-sm text-neutral-500">{description}</p>}
      {children}
    </div>
  )
}
