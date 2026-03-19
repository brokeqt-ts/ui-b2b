import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import type { Order } from '@/shared/types'
import { Badge } from '@/ui/atoms/Badge'
import { formatCurrency, formatDate } from '@/shared/lib/formatters'

const col = createColumnHelper<Order>()

const STATUS_MAP: Record<Order['status'], { label: string; variant: 'info' | 'warning' | 'success' | 'danger' | 'default' }> = {
  active: { label: 'Активный', variant: 'info' },
  pending: { label: 'В ожидании', variant: 'warning' },
  completed: { label: 'Завершён', variant: 'success' },
  cancelled: { label: 'Отменён', variant: 'danger' },
  draft: { label: 'Черновик', variant: 'default' },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const orderColumns: ColumnDef<Order, any>[] = [
  col.accessor('number', {
    header: '№ Заказа',
    cell: (info) => <span style={{ fontWeight: 500 }}>{info.getValue()}</span>,
  }),
  col.accessor('client', {
    header: 'Клиент',
  }),
  col.accessor('amount', {
    header: 'Сумма',
    cell: (info) => formatCurrency(info.getValue()),
  }),
  col.accessor('status', {
    header: 'Статус',
    cell: (info) => {
      const s = STATUS_MAP[info.getValue() as Order['status']]
      return <Badge variant={s.variant}>{s.label}</Badge>
    },
  }),
  col.accessor('items', {
    header: 'Позиции',
  }),
  col.accessor('manager', {
    header: 'Менеджер',
  }),
  col.accessor('date', {
    header: 'Дата',
    cell: (info) => formatDate(info.getValue()),
  }),
]
