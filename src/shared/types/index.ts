export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'manager' | 'viewer'
}

export interface PaginationState {
  page: number
  pageSize: number
  total: number
}

export interface ApiResponse<T> {
  data: T
  pagination?: PaginationState
}

export type Status = 'active' | 'pending' | 'completed' | 'cancelled' | 'draft'

export interface Order {
  id: string
  number: string
  client: string
  amount: number
  status: Status
  date: string
  items: number
  manager: string
}

export interface DashboardKpi {
  label: string
  value: number
  change: number
  format: 'currency' | 'number' | 'percent'
}

export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}
