import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '@/shared/lib/cn'
import styles from './Input.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, iconLeft, iconRight, className, ...props }, ref) => {
    return (
      <div className={cn(styles.wrapper, className)} data-error={error || undefined}>
        {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
        <input
          ref={ref}
          className={styles.input}
          data-has-icon-left={iconLeft ? true : undefined}
          data-has-icon-right={iconRight ? true : undefined}
          {...props}
        />
        {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
