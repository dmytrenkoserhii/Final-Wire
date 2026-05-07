import { useGameStore } from '../../../shared/stores/game.store'
import type { GameStoreState } from '../../../shared/stores/game.store'

export type GameContextValue = GameStoreState

export function useGame(): GameContextValue
export function useGame<T>(selector: (state: GameContextValue) => T): T
export function useGame<T = GameContextValue>(selector?: (state: GameContextValue) => T) {
  const resolved = (selector ?? ((state: GameContextValue) => state as unknown as T)) as (
    state: GameContextValue,
  ) => T
  return useGameStore(resolved)
}
