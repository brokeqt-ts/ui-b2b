import { Outlet } from 'react-router-dom'
import styles from './AuthLayout.module.css'

export function AuthLayout() {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="var(--color-accent)" />
            <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={styles.logoText}>B2B Platform</span>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
