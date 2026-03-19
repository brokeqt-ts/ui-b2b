import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/shared/hooks/useTheme'
import styles from './Header.module.css'

interface HeaderProps {
  onMenuClick: () => void
}

interface Notification {
  id: string
  text: string
  time: string
  read: boolean
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: '1', text: 'Новый заказ ORD-0067 от ООО "Техноком"', time: '5 мин назад', read: false },
  { id: '2', text: 'Оплата по заказу ORD-0054 подтверждена', time: '23 мин назад', read: false },
  { id: '3', text: 'Клиент ЗАО "Сибирь" обновил профиль', time: '1 час назад', read: false },
  { id: '4', text: 'Заказ ORD-0048 отправлен', time: '2 часа назад', read: true },
  { id: '5', text: 'Новый клиент ООО "Инновация" зарегистрирован', time: '3 часа назад', read: true },
]

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const notifRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    if (notifOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [notifOpen])

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <header className={styles.header}>
      <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Toggle menu">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </button>

      <div className={styles.spacer} />

      <button className={styles.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">
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

      <div className={styles.notifWrapper} ref={notifRef}>
        <button
          className={styles.notifBtn}
          onClick={() => setNotifOpen((v) => !v)}
          aria-label="Уведомления"
        >
          <svg width="30" height="30" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 2a5 5 0 00-5 5c0 4-2 6-2 6h14s-2-2-2-6a5 5 0 00-5-5zM8.5 17a1.5 1.5 0 003 0" />
          </svg>
          {unreadCount > 0 && (
            <span className={styles.notifDot}>{unreadCount > 9 ? '9+' : unreadCount}</span>
          )}
        </button>

        {notifOpen && (
          <div className={styles.notifDropdown}>
            <div className={styles.notifHeader}>
              <span className={styles.notifTitle}>Уведомления</span>
              {unreadCount > 0 && (
                <button className={styles.markAllBtn} onClick={markAllRead}>
                  Отметить все
                </button>
              )}
            </div>

            <div className={styles.notifList}>
              {notifications.length === 0 ? (
                <p className={styles.notifEmpty}>Нет уведомлений</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={styles.notifItem}
                    data-read={n.read || undefined}
                    onClick={() => markRead(n.id)}
                  >
                    {!n.read && <span className={styles.notifUnreadDot} />}
                    <div className={styles.notifItemContent}>
                      <p className={styles.notifItemText}>{n.text}</p>
                      <span className={styles.notifItemTime}>{n.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
