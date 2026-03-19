import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { useChartColors } from './useChartColors'

export interface LineChartProps {
  data: Record<string, unknown>[]
  xKey: string
  lines: { key: string; name: string; colorIndex?: number }[]
  height?: number
}

export function LineChart({ data, xKey, lines, height = 300 }: LineChartProps) {
  const colors = useChartColors()

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
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
        {lines.map((line, i) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            name={line.name}
            stroke={colors.palette[line.colorIndex ?? i]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  )
}
