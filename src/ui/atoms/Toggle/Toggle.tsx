import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/shared/lib/cn'
import styles from './Toggle.module.css'

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className={cn(styles.label, className)}>
        <input ref={ref} type="checkbox" className={styles.input} {...props} />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
        {label && <span className={styles.text}>{label}</span>}
      </label>
    )
  }
)

Toggle.displayName = 'Toggle'
