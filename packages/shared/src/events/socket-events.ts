export const SocketEventName = {
  Ping: 'ping',
  Pong: 'pong',
} as const

export type SocketEventName = (typeof SocketEventName)[keyof typeof SocketEventName]
