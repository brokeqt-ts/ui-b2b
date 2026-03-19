import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/ui/atoms/Button'
import { Badge } from '@/ui/atoms/Badge'
import { Card } from '@/ui/organisms/Card'
import { Modal } from '@/ui/organisms/Modal'
import { mockOrders } from '@/mock/orders'
import { formatCurrency, formatDateTime } from '@/shared/lib/formatters'
import { useToastStore } from '@/ui/molecules/Toast'
import styles from './OrderDetailPage.module.css'

const STATUS_MAP: Record<string, { label: string; variant: 'info' | 'warning' | 'success' | 'danger' | 'default' }> = {
  active: { label: 'Активный', variant: 'info' },
  pending: { label: 'В ожидании', variant: 'warning' },
  completed: { label: 'Завершён', variant: 'success' },
  cancelled: { label: 'Отменён', variant: 'danger' },
  draft: { label: 'Черновик', variant: 'default' },
}

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addToast = useToastStore((s) => s.addToast)
  const [cancelModal, setCancelModal] = useState(false)

  const order = mockOrders.find((o) => o.id === id)

  if (!order) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Заказ не найден</h2>
        <Link to="/orders" style={{ color: 'var(--color-text-link)' }}>Вернуться к списку</Link>
      </div>
    )
  }

  const status = STATUS_MAP[order.status]

  const handleCancel = () => {
    setCancelModal(false)
    addToast({ type: 'success', message: `Заказ ${order.number} отменён` })
    navigate('/orders')
  }

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link to="/orders" className={styles.breadcrumbLink}>Заказы</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>{order.number}</span>
      </div>

      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{order.number}</h1>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <p className={styles.subtitle}>Создан {formatDateTime(order.date)}</p>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary">Редактировать</Button>
          {order.status !== 'cancelled' && (
            <Button variant="danger" onClick={() => setCancelModal(true)}>Отменить</Button>
          )}
        </div>
      </div>

      <div className={styles.grid}>
        <Card padding="lg">
          <h3 className={styles.sectionTitle}>Основная информация</h3>
          <dl className={styles.details}>
            <div className={styles.detailRow}>
              <dt>Клиент</dt>
              <dd>{order.client}</dd>
            </div>
            <div className={styles.detailRow}>
              <dt>Сумма</dt>
              <dd style={{ fontWeight: 600 }}>{formatCurrency(order.amount)}</dd>
            </div>
            <div className={styles.detailRow}>
              <dt>Позиции</dt>
              <dd>{order.items}</dd>
            </div>
            <div className={styles.detailRow}>
              <dt>Менеджер</dt>
              <dd>{order.manager}</dd>
            </div>
          </dl>
        </Card>

        <Card padding="lg">
          <h3 className={styles.sectionTitle}>История</h3>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} data-type="success" />
              <div>
                <p className={styles.timelineText}>Заказ создан</p>
                <span className={styles.timelineTime}>{formatDateTime(order.date)}</span>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} data-type="info" />
              <div>
                <p className={styles.timelineText}>Подтверждение оплаты</p>
                <span className={styles.timelineTime}>{formatDateTime(new Date(new Date(order.date).getTime() + 3600000).toISOString())}</span>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} data-type="warning" />
              <div>
                <p className={styles.timelineText}>Передан в обработку</p>
                <span className={styles.timelineTime}>{formatDateTime(new Date(new Date(order.date).getTime() + 86400000).toISOString())}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Modal
        open={cancelModal}
        onClose={() => setCancelModal(false)}
        title="Отменить заказ?"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setCancelModal(false)}>Нет, оставить</Button>
            <Button variant="danger" onClick={handleCancel}>Да, отменить</Button>
          </>
        }
      >
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Вы уверены, что хотите отменить заказ <strong>{order.number}</strong>? Это действие нельзя отменить.
        </p>
      </Modal>
    </div>
  )
}
