import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '@/shared/lib/cn'
import { Spinner } from '@/ui/atoms/Spinner'
import styles from './Button.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, children, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(styles.button, className)}
        data-variant={variant}
        data-size={size}
        data-loading={loading || undefined}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Spinner size="sm" /> : icon ? <span className={styles.icon}>{icon}</span> : null}
        {children && <span>{children}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
