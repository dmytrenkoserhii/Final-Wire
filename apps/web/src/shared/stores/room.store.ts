import { create } from 'zustand'
import type { Difficulty, MockRoom } from '../types/game.types'
import { buildMockRoom, generateRoomCode } from '../lib/mock-data'

export interface RoomStoreState {
  room: MockRoom | null
  createRoom: (params: { difficulty: Difficulty; maxPlayers: number }) => MockRoom
  joinRoom: (code: string) => MockRoom
  setReady: (isReady: boolean) => void
  setDifficulty: (d: Difficulty) => void
  leaveRoom: () => void
}

export const useRoomStore = create<RoomStoreState>((set) => ({
  room: null,
  createRoom: ({ difficulty, maxPlayers }) => {
    const next = buildMockRoom(generateRoomCode())
    next.difficulty = difficulty
    next.maxPlayers = maxPlayers
    next.players = next.players.slice(0, maxPlayers)

    console.info('[room] createRoom', next)
    set({ room: next })
    return next
  },
  joinRoom: (code) => {
    const next = buildMockRoom(code.toUpperCase())

    console.info('[room] joinRoom', code)
    set({ room: next })
    return next
  },
  setReady: (isReady) => {
    set((state) => {
      if (!state.room) return state
      return {
        room: {
          ...state.room,
          players: state.room.players.map((p) =>
            p.playerId === 'user_self' ? { ...p, isReady } : p,
          ),
        },
      }
    })
  },
  setDifficulty: (d) => {
    set((state) => (state.room ? { room: { ...state.room, difficulty: d } } : state))
  },
  leaveRoom: () => {
    console.info('[room] leaveRoom')
    set({ room: null })
  },
}))
