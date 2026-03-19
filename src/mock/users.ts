import type { User } from '@/shared/types'

export const mockUser: User = {
  id: 'usr-001',
  email: 'alexey@company.ru',
  name: 'Алексей Кудрявцев',
  role: 'admin',
}

export const mockUsers: User[] = [
  mockUser,
  { id: 'usr-002', email: 'maria@company.ru', name: 'Мария Смирнова', role: 'manager' },
  { id: 'usr-003', email: 'dmitry@company.ru', name: 'Дмитрий Волков', role: 'manager' },
  { id: 'usr-004', email: 'olga@company.ru', name: 'Ольга Новикова', role: 'viewer' },
]
