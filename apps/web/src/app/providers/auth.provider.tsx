import { useAuthStore } from '../../shared/stores/auth.store'
import type { AuthStoreState } from '../../shared/stores/auth.store'

export type AuthContextValue = AuthStoreState

export function useAuth(): AuthContextValue
export function useAuth<T>(selector: (state: AuthContextValue) => T): T
export function useAuth<T = AuthContextValue>(selector?: (state: AuthContextValue) => T) {
  const resolved = (selector ?? ((state: AuthContextValue) => state as unknown as T)) as (
    state: AuthContextValue,
  ) => T
  return useAuthStore(resolved)
}
