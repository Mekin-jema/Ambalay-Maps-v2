// stores/useAuthStore.ts
import { create } from 'zustand'
import axios from 'axios'

type User = {
  id: string
  email: string
  name?: string
}

type AuthStore = {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null

  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
  fetchUser: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const res = await axios.post('/api/login', { email, password })
      const { token, user } = res.data
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      set({ user, token, loading: false })
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Login failed', loading: false })
      throw err
    }
  },

  signup: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const res = await axios.post('/api/signup', { email, password })
      set({ loading: false })
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Signup failed', loading: false })
      throw err
    }
  },

  forgotPassword: async (email) => {
    set({ loading: true, error: null })
    try {
      await axios.post('/api/forgot-password', { email })
      set({ loading: false })
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to send email', loading: false })
      throw err
    }
  },

  resetPassword: async (token, password) => {
    set({ loading: true, error: null })
    try {
      await axios.post('/api/reset-password', { token, password })
      set({ loading: false })
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Reset failed', loading: false })
      throw err
    }
  },

  fetchUser: async () => {
    set({ loading: true })
    try {
      const res = await axios.get('/api/me')
      set({ user: res.data, loading: false })
    } catch (err) {
      set({ loading: false })
    }
  },

  logout: () => {
    delete axios.defaults.headers.common['Authorization']
    set({ user: null, token: null })
  }
}))
