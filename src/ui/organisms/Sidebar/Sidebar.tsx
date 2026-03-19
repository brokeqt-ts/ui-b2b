import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { path: '/', label: 'Дашборд', icon: 'dashboard' },
  { path: '/orders', label: 'Заказы', icon: 'orders' },
  { path: '/onboarding', label: 'Онбординг', icon: 'form' },
  { path: '/settings', label: 'Настройки', icon: 'settings' },
]

const ICONS: Record<string, ReactNode> = {
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="7" height="8" rx="1.5" />
      <rect x="11" y="2" width="7" height="5" rx="1.5" />
      <rect x="2" y="12" width="7" height="6" rx="1.5" />
      <rect x="11" y="9" width="7" height="9" rx="1.5" />
    </svg>
  ),
  orders: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4h14M3 8h14M3 12h10M3 16h7" />
    </svg>
  ),
  form: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="14" height="16" rx="2" />
      <path d="M7 6h6M7 10h6M7 14h3" />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="2.5" />
      <path d="M10 2l-1.2 2.6A5.5 5.5 0 006.5 6L4 5.1 2 8.6l2.1 1.7v1.4L2 13.4 4 16.9l2.5-.9a5.5 5.5 0 002.3 1.4L10 20l1.2-2.6a5.5 5.5 0 002.3-1.4l2.5.9 2-3.5-2.1-1.7v-1.4l2.1-1.7-2-3.5-2.5.9A5.5 5.5 0 0011.2 4.6L10 2z" />
    </svg>
  ),
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <aside className={styles.sidebar} data-open={open}>
      <div className={styles.brand}>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="var(--color-accent)" />
          <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={styles.brandText}>B2B Platform</span>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
            onClick={onClose}
          >
            <span className={styles.navIcon}>{ICONS[item.icon]}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>АК</div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>Алексей К.</span>
            <span className={styles.userRole}>Администратор</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
