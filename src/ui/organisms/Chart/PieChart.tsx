import {
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'
import { useChartColors } from './useChartColors'

export interface PieChartProps {
  data: { name: string; value: number }[]
  height?: number
  innerRadius?: number
}

export function PieChart({ data, height = 300, innerRadius = 60 }: PieChartProps) {
  const colors = useChartColors()

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RePieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={innerRadius + 40}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors.palette[i % colors.palette.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: colors.bg,
            border: `1px solid ${colors.grid}`,
            borderRadius: 8,
            fontSize: 13,
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: 13, color: colors.text }}
        />
      </RePieChart>
    </ResponsiveContainer>
  )
}
