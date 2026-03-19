import { useMemo } from 'react'
import { useTheme } from '@/shared/hooks/useTheme'

export function useChartColors() {
  const { theme } = useTheme()

  return useMemo(() => {
    const s = getComputedStyle(document.documentElement)
    const get = (v: string) => s.getPropertyValue(v).trim()

    return {
      primary: get('--color-chart-1'),
      secondary: get('--color-chart-2'),
      tertiary: get('--color-chart-3'),
      quaternary: get('--color-chart-4'),
      quinary: get('--color-chart-5'),
      grid: get('--color-chart-grid'),
      text: get('--color-chart-text'),
      bg: get('--color-bg-surface'),
      palette: [
        get('--color-chart-1'),
        get('--color-chart-2'),
        get('--color-chart-3'),
        get('--color-chart-4'),
        get('--color-chart-5'),
      ],
    }
  }, [theme])
}
