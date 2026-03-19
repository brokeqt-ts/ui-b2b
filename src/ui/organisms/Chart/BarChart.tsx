import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { useChartColors } from './useChartColors'

export interface BarChartProps {
  data: Record<string, unknown>[]
  xKey: string
  bars: { key: string; name: string; colorIndex?: number }[]
  height?: number
}

export function BarChart({ data, xKey, bars, height = 300 }: BarChartProps) {
  const colors = useChartColors()

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
        <XAxis dataKey={xKey} tick={{ fill: colors.text, fontSize: 12 }} stroke={colors.grid} />
        <YAxis tick={{ fill: colors.text, fontSize: 12 }} stroke={colors.grid} />
        <Tooltip
          contentStyle={{
            backgroundColor: colors.bg,
            border: `1px solid ${colors.grid}`,
            borderRadius: 8,
            fontSize: 13,
          }}
        />
        {bars.map((bar, i) => (
          <Bar
            key={bar.key}
            dataKey={bar.key}
            name={bar.name}
            fill={colors.palette[bar.colorIndex ?? i]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  )
}
