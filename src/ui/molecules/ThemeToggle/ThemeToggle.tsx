import { useTheme } from '@/shared/hooks/useTheme'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button className={styles.btn} onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? (
        <svg width="30" height="30" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M10 2v1M10 17v1M2 10h1M17 10h1M4.22 4.22l.7.7M15.08 15.08l.7.7M4.22 15.78l.7-.7M15.08 4.92l.7-.7" />
          <circle cx="10" cy="10" r="4" />
        </svg>
      ) : (
        <svg width="30" height="30" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 12.5A7 7 0 117.5 3a5.5 5.5 0 009.5 9.5z" />
        </svg>
      )}
    </button>
  )
}
