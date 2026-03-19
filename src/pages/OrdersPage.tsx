import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/ui/atoms/Button'
import { Select } from '@/ui/atoms/Select'
import { SearchInput } from '@/ui/molecules/SearchInput'
import { DataTable } from '@/ui/organisms/DataTable'
import { mockOrders } from '@/mock/orders'
import { orderColumns } from '@/features/orders/columns'
import type { Order } from '@/shared/types'
import styles from './OrdersPage.module.css'

const STATUS_OPTIONS = [
  { value: '', label: 'Все статусы' },
  { value: 'active', label: 'Активные' },
  { value: 'pending', label: 'В ожидании' },
  { value: 'completed', label: 'Завершённые' },
  { value: 'cancelled', label: 'Отменённые' },
  { value: 'draft', label: 'Черновики' },
]

export function OrdersPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredData = mockOrders.filter((order) => {
    if (statusFilter && order.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        order.number.toLowerCase().includes(q) ||
        order.client.toLowerCase().includes(q) ||
        order.manager.toLowerCase().includes(q)
      )
    }
    return true
  })

  const handleRowClick = useCallback((row: Order) => {
    navigate(`/orders/${row.id}`)
  }, [navigate])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Заказы</h1>
          <p className={styles.subtitle}>{filteredData.length} заказов</p>
        </div>
        <Button>Новый заказ</Button>
      </div>

      <div className={styles.filters}>
        <SearchInput onSearch={setSearch} placeholder="Поиск по номеру, клиенту..." className={styles.search} />
        <Select
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      </div>

      <DataTable
        data={filteredData}
        columns={orderColumns}
        pageSize={10}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
