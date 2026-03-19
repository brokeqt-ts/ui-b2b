import type { DashboardKpi } from '@/shared/types'

export const mockKpis: DashboardKpi[] = [
  { label: 'Выручка', value: 12450000, change: 12.5, format: 'currency' },
  { label: 'Заказы', value: 584, change: 8.2, format: 'number' },
  { label: 'Клиенты', value: 142, change: -3.1, format: 'number' },
  { label: 'Конверсия', value: 4.8, change: 1.2, format: 'percent' },
]

export const mockRevenueData = [
  { month: 'Окт', revenue: 8200000, expenses: 5100000 },
  { month: 'Ноя', revenue: 9100000, expenses: 5400000 },
  { month: 'Дек', revenue: 11500000, expenses: 6200000 },
  { month: 'Янв', revenue: 9800000, expenses: 5800000 },
  { month: 'Фев', revenue: 10700000, expenses: 5600000 },
  { month: 'Мар', revenue: 12450000, expenses: 6100000 },
]

export const mockOrdersByStatus = [
  { name: 'Активные', value: 45 },
  { name: 'В ожидании', value: 28 },
  { name: 'Завершённые', value: 120 },
  { name: 'Отменённые', value: 15 },
]

export const mockWeeklyOrders = [
  { day: 'Пн', orders: 18 },
  { day: 'Вт', orders: 24 },
  { day: 'Ср', orders: 21 },
  { day: 'Чт', orders: 32 },
  { day: 'Пт', orders: 28 },
  { day: 'Сб', orders: 12 },
  { day: 'Вс', orders: 8 },
]

export const mockActivity = [
  { id: '1', text: 'Новый заказ ORD-0067 от ООО "Техноком"', time: '5 мин назад' },
  { id: '2', text: 'Оплата по заказу ORD-0054 подтверждена', time: '23 мин назад' },
  { id: '3', text: 'Клиент ЗАО "Сибирь" обновил профиль', time: '1 час назад' },
  { id: '4', text: 'Заказ ORD-0048 отправлен', time: '2 часа назад' },
  { id: '5', text: 'Новый клиент ООО "Инновация" зарегистрирован', time: '3 часа назад' },
]
