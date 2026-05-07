import type {
  GameSnapshot,
  MockPlayer,
  MockRoom,
  MockUser,
  ResultSnapshot,
} from '../types/game.types'

export const MOCK_USER: MockUser = {
  id: 'user_self',
  displayName: 'Operator-01',
  email: 'operator@finalwire.dev',
  avatarUrl: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=operator-01',
}

export const MOCK_PLAYERS: MockPlayer[] = [
  {
    playerId: 'user_self',
    displayName: 'Operator-01',
    avatarUrl: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=operator-01',
    isHost: true,
    isReady: true,
    role: null,
  },
  {
    playerId: 'p_2',
    displayName: 'Vanta',
    avatarUrl: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=vanta',
    isHost: false,
    isReady: true,
    role: null,
  },
  {
    playerId: 'p_3',
    displayName: 'Halo',
    avatarUrl: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=halo',
    isHost: false,
    isReady: false,
    role: null,
  },
]

export const buildMockRoom = (code: string): MockRoom => ({
  roomCode: code,
  status: 'LOBBY',
  difficulty: 'NORMAL',
  maxPlayers: 4,
  hostPlayerId: 'user_self',
  players: MOCK_PLAYERS,
})

export const buildMockGame = (role: 'OPERATOR' | 'EXPERT'): GameSnapshot => {
  const now = Date.now()
  return {
    sessionId: 'sess_mock',
    role,
    status: 'ACTIVE',
    endsAt: now + 6 * 60 * 1000,
    totalSeconds: 6 * 60,
    stability: 92,
    mistakes: 1,
    modules: [
      { moduleId: 'm_wires', moduleKey: 'WIRES', state: 'PENDING', mistakes: 0 },
      { moduleId: 'm_glyphs', moduleKey: 'GLYPHS', state: 'IN_PROGRESS', mistakes: 1 },
      { moduleId: 'm_pressure', moduleKey: 'PRESSURE', state: 'PENDING', mistakes: 0 },
      { moduleId: 'm_keypad', moduleKey: 'KEYPAD', state: 'SOLVED', mistakes: 0 },
    ],
  }
}

export const buildMockResult = (won: boolean): ResultSnapshot => ({
  sessionId: 'sess_mock',
  won,
  score: won ? 2480 : 720,
  timeRemainingSec: won ? 41 : 0,
  finalStability: won ? 62 : 0,
  mistakes: won ? 3 : 7,
  modules: [
    { moduleKey: 'WIRES', state: won ? 'SOLVED' : 'FAILED', mistakes: 1 },
    { moduleKey: 'GLYPHS', state: 'SOLVED', mistakes: 0 },
    { moduleKey: 'PRESSURE', state: won ? 'SOLVED' : 'PENDING', mistakes: 2 },
    { moduleKey: 'KEYPAD', state: won ? 'SOLVED' : 'FAILED', mistakes: 0 },
  ],
})

export const generateRoomCode = (): string => {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return code
}
