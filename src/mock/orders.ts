import type { Order } from '@/shared/types'

const CLIENTS = [
  'ООО "Техноком"', 'ЗАО "Сибирь"', 'ИП Иванов', 'ООО "Прогресс"',
  'АО "Стройинвест"', 'ООО "Лидер"', 'ГК "Альянс"', 'ООО "Меридиан"',
  'ЗАО "Спектр"', 'ООО "Гарант"', 'АО "Вектор"', 'ООО "Инновация"',
]

const MANAGERS = ['Алексей К.', 'Мария С.', 'Дмитрий В.', 'Ольга Н.', 'Сергей Т.']
const STATUSES: Order['status'][] = ['active', 'pending', 'completed', 'cancelled', 'draft']

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString()
}

export const mockOrders: Order[] = Array.from({ length: 67 }, (_, i) => ({
  id: `ord-${String(i + 1).padStart(4, '0')}`,
  number: `ORD-${String(i + 1).padStart(4, '0')}`,
  client: CLIENTS[i % CLIENTS.length],
  amount: randomInt(15000, 2500000),
  status: STATUSES[i % STATUSES.length],
  date: randomDate(new Date('2025-10-01'), new Date('2026-03-19')),
  items: randomInt(1, 24),
  manager: MANAGERS[i % MANAGERS.length],
})).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
