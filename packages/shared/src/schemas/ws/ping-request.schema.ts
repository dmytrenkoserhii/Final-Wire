import { z } from 'zod'

export const pingRequestSchema = z
  .object({
    message: z.string().trim().min(1).max(256).optional(),
  })
  .strict()
