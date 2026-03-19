import { create } from 'zustand'
import type { User } from '@/shared/types'
import { mockUser } from '@/mock/users'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (_email, _password) => {
    // Mock login — always succeeds
    await new Promise((r) => setTimeout(r, 800))
    set({ user: mockUser, isAuthenticated: true })
    return true
  },
  register: async (_email, _password, name) => {
    await new Promise((r) => setTimeout(r, 800))
    set({
      user: { ...mockUser, name, email: _email },
      isAuthenticated: true,
    })
    return true
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}))
