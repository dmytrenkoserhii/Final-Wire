import { create } from 'zustand'
import type { GameSnapshot, ModuleKey, ModuleState, Role } from '../types/game.types'
import { buildMockGame } from '../lib/mock-data'

export interface GameStoreState {
  game: GameSnapshot
  setRole: (role: Role) => void
  setModuleState: (key: ModuleKey, state: ModuleState) => void
  applyPenalty: (stabilityDelta: number, timeDeltaSec?: number) => void
  forceWin: () => void
  forceLoss: () => void
  reset: (role?: Role) => void
}

export const useGameStore = create<GameStoreState>((set) => ({
  game: buildMockGame('OPERATOR'),
  setRole: (role) => {
    set((state) => ({ game: { ...state.game, role } }))
  },
  setModuleState: (key, moduleState) => {
    set((state) => {
      const modules = state.game.modules.map((m) =>
        m.moduleKey === key ? { ...m, state: moduleState } : m,
      )
      const allSolved = modules.every((m) => m.state === 'SOLVED')
      return {
        game: {
          ...state.game,
          modules,
          status: allSolved ? 'WON' : state.game.status,
        },
      }
    })
  },
  applyPenalty: (stabilityDelta, timeDeltaSec = 0) => {
    set((state) => {
      const stability = Math.max(0, Math.min(100, state.game.stability + stabilityDelta))
      const endsAt = state.game.endsAt + timeDeltaSec * 1000
      const status = stability <= 0 ? 'LOST' : state.game.status
      return {
        game: {
          ...state.game,
          stability,
          endsAt,
          mistakes: stabilityDelta < 0 ? state.game.mistakes + 1 : state.game.mistakes,
          status,
        },
      }
    })
  },
  forceWin: () => {
    set((state) => ({
      game: {
        ...state.game,
        status: 'WON',
        modules: state.game.modules.map((m) => ({ ...m, state: 'SOLVED' })),
      },
    }))
  },
  forceLoss: () => {
    set((state) => ({ game: { ...state.game, status: 'LOST', stability: 0 } }))
  },
  reset: (role = 'OPERATOR') => {
    set({ game: buildMockGame(role) })
  },
}))
