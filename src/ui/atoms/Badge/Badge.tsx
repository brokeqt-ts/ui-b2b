import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import styles from './Badge.module.css'

export interface BadgeProps {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
  children: ReactNode
  className?: string
}

export function Badge({ variant = 'default', size = 'md', children, className }: BadgeProps) {
  return (
    <span className={cn(styles.badge, className)} data-variant={variant} data-size={size}>
      {children}
    </span>
  )
}
