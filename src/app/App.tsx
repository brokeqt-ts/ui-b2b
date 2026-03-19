import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { ToastContainer } from '@/ui/molecules/Toast'
import { ThemeToggle } from '@/ui/molecules/ThemeToggle'
import { router } from '@/app/router'

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <ToastContainer />
      <div style={{ position: 'fixed', top: 12, right: 16, zIndex: 200 }}>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  )
}
