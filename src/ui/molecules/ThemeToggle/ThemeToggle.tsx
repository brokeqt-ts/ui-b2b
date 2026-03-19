import { useTheme } from '@/shared/hooks/useTheme'
import { Toggle } from '@/ui/atoms/Toggle'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Toggle
      checked={theme === 'dark'}
      onChange={toggleTheme}
      label={theme === 'dark' ? 'Тёмная тема' : 'Светлая тема'}
    />
  )
}
