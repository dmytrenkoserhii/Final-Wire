import { create } from 'zustand'
import type { MockUser } from '../types/game.types'
import { MOCK_USER } from '../lib/mock-data'

const STORAGE_KEY = 'fw.auth.user'

const loadUser = (): MockUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as MockUser) : null
  } catch {
    return null
  }
}

const persistUser = (user: MockUser | null) => {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

export interface AuthStoreState {
  user: MockUser | null
  isAuthenticated: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => void
  updateProfile: (patch: Partial<Pick<MockUser, 'displayName' | 'avatarUrl'>>) => void
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: loadUser(),
  isAuthenticated: !!loadUser(),
  signInWithGoogle: async () => {
    console.info('[auth] signInWithGoogle (mock) - would redirect to Google OAuth')
    await new Promise((r) => setTimeout(r, 600))
    persistUser(MOCK_USER)
    set({ user: MOCK_USER, isAuthenticated: true })
  },
  signOut: () => {
    console.info('[auth] signOut')
    persistUser(null)
    set({ user: null, isAuthenticated: false })
  },
  updateProfile: (patch) => {
    const user = get().user
    if (!user) return
    const next = { ...user, ...patch }
    persistUser(next)
    set({ user: next, isAuthenticated: true })
  },
}))
