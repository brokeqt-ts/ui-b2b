import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import styles from './Icon.module.css'

export interface IconProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Icon({ children, size = 'md', className }: IconProps) {
  return (
    <span className={cn(styles.icon, className)} data-size={size}>
      {children}
    </span>
  )
}
