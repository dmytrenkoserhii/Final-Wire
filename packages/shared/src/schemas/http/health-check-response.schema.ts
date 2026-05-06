import { z } from 'zod'
import { HealthStatus } from '../../enums/health-status.enum.js'

export const healthCheckResponseSchema = z.object({
  status: z.literal(HealthStatus.Ok),
})
