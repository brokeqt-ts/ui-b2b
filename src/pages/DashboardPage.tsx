import { StatCard } from '@/ui/molecules/StatCard'
import { Card } from '@/ui/organisms/Card'
import { LineChart } from '@/ui/organisms/Chart'
import { BarChart } from '@/ui/organisms/Chart'
import { PieChart } from '@/ui/organisms/Chart'
import { mockKpis, mockRevenueData, mockOrdersByStatus, mockWeeklyOrders, mockActivity } from '@/mock/dashboard'
import { formatCurrency, formatNumber } from '@/shared/lib/formatters'
import styles from './DashboardPage.module.css'

function formatKpiValue(kpi: typeof mockKpis[0]) {
  switch (kpi.format) {
    case 'currency': return formatCurrency(kpi.value)
    case 'percent': return `${kpi.value}%`
    default: return formatNumber(kpi.value)
  }
}

export function DashboardPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Дашборд</h1>
        <p className={styles.subtitle}>Обзор ключевых показателей</p>
      </div>

      <div className={styles.kpiGrid}>
        {mockKpis.map((kpi) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={formatKpiValue(kpi)}
            change={kpi.change}
          />
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <Card padding="lg" className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Выручка и расходы</h3>
          <LineChart
            data={mockRevenueData}
            xKey="month"
            lines={[
              { key: 'revenue', name: 'Выручка' },
              { key: 'expenses', name: 'Расходы', colorIndex: 2 },
            ]}
            height={280}
          />
        </Card>

        <Card padding="lg" className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Заказы за неделю</h3>
          <BarChart
            data={mockWeeklyOrders}
            xKey="day"
            bars={[{ key: 'orders', name: 'Заказы' }]}
            height={280}
          />
        </Card>
      </div>

      <div className={styles.bottomGrid}>
        <Card padding="lg">
          <h3 className={styles.cardTitle}>Заказы по статусу</h3>
          <PieChart data={mockOrdersByStatus} height={260} />
        </Card>

        <Card padding="lg">
          <h3 className={styles.cardTitle}>Последняя активность</h3>
          <div className={styles.activityList}>
            {mockActivity.map((item) => (
              <div key={item.id} className={styles.activityItem}>
                <div className={styles.activityDot} />
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>{item.text}</p>
                  <span className={styles.activityTime}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
