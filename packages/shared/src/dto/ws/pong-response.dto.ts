import type { PingRequestDto } from './ping-request.dto.js'

export interface PongResponseDto {
  event: 'pong'
  data: {
    message: 'pong'
    received: PingRequestDto | null
    clientId: string
  }
}
