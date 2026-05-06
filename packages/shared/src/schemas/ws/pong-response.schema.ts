import { z } from 'zod'
import { SocketEventName } from '../../events/socket-events.js'
import { pingRequestSchema } from './ping-request.schema.js'

export const pongResponseSchema = z.object({
  event: z.literal(SocketEventName.Pong),
  data: z.object({
    message: z.literal(SocketEventName.Pong),
    received: pingRequestSchema.nullable(),
    clientId: z.string().min(1),
  }),
})
