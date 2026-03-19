import type { ReactNode } from 'react'
import styles from './StatCard.module.css'

export interface StatCardProps {
  label: string
  value: string
  change?: number
  icon?: ReactNode
  className?: string
}

export function StatCard({ label, value, change, icon, className }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0

  return (
    <div className={`${styles.card} ${className ?? ''}`}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      <div className={styles.value}>{value}</div>
      {change !== undefined && (
        <div className={styles.change} data-positive={isPositive}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {isPositive ? <path d="M6 9V3M3 5l3-3 3 3" /> : <path d="M6 3v6M3 7l3 3 3-3" />}
          </svg>
          {Math.abs(change).toFixed(1)}%
        </div>
      )}
    </div>
  )
}
