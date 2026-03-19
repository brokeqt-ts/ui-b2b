import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Sidebar } from '@/ui/organisms/Sidebar/Sidebar'
import { Header } from '@/ui/organisms/Header/Header'
import { useIsTablet } from '@/shared/hooks/useMediaQuery'
import styles from './DashboardLayout.module.css'

export function DashboardLayout() {
  const isTablet = useIsTablet()
  const [sidebarOpen, setSidebarOpen] = useState(!isTablet)

  return (
    <div className={styles.layout} data-sidebar-open={sidebarOpen}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {isTablet && sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}
      <div className={styles.main}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
