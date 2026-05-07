export type Difficulty = 'EASY' | 'NORMAL' | 'HARD' | 'CUSTOM'
export type Role = 'OPERATOR' | 'EXPERT'
export type RoomStatus = 'LOBBY' | 'STARTING' | 'IN_GAME' | 'ENDED'
export type ModuleKey = 'WIRES' | 'GLYPHS' | 'PRESSURE' | 'KEYPAD'
export type ModuleState = 'PENDING' | 'IN_PROGRESS' | 'SOLVED' | 'FAILED'
export type GameStatus = 'ACTIVE' | 'WON' | 'LOST'

export interface MockUser {
  id: string
  displayName: string
  email: string
  avatarUrl: string
}

export interface MockPlayer {
  playerId: string
  displayName: string
  avatarUrl: string
  isHost: boolean
  isReady: boolean
  role: Role | null
}

export interface MockRoom {
  roomCode: string
  status: RoomStatus
  difficulty: Difficulty
  maxPlayers: number
  hostPlayerId: string
  players: MockPlayer[]
}

export interface ModuleSnapshot {
  moduleId: string
  moduleKey: ModuleKey
  state: ModuleState
  mistakes: number
}

export interface GameSnapshot {
  sessionId: string
  role: Role
  status: GameStatus
  endsAt: number
  totalSeconds: number
  stability: number
  modules: ModuleSnapshot[]
  mistakes: number
}

export interface ResultSnapshot {
  sessionId: string
  won: boolean
  score: number
  timeRemainingSec: number
  finalStability: number
  mistakes: number
  modules: { moduleKey: ModuleKey; state: ModuleState; mistakes: number }[]
}
