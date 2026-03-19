import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/shared/lib/cn'
import styles from './Checkbox.module.css'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate, className, ...props }, ref) => {
    return (
      <label className={cn(styles.label, className)}>
        <input
          ref={(el) => {
            if (el) el.indeterminate = !!indeterminate
            if (typeof ref === 'function') ref(el)
            else if (ref) ref.current = el
          }}
          type="checkbox"
          className={styles.input}
          {...props}
        />
        <span className={styles.check}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {indeterminate ? (
              <path d="M2.5 6h7" />
            ) : (
              <path d="M2.5 6L5 8.5L9.5 3.5" />
            )}
          </svg>
        </span>
        {label && <span className={styles.text}>{label}</span>}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
