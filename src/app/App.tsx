import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { ToastContainer } from '@/ui/molecules/Toast'
import { router } from '@/app/router'

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  )
}
