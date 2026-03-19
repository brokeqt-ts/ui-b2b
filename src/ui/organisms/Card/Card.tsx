import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import styles from './Card.module.css'

export interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  onClick?: () => void
}

export function Card({ children, className, padding = 'md', hoverable, onClick }: CardProps) {
  return (
    <div
      className={cn(styles.card, className)}
      data-padding={padding}
      data-hoverable={hoverable || undefined}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(styles.header, className)}>{children}</div>
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(styles.body, className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(styles.footer, className)}>{children}</div>
}
