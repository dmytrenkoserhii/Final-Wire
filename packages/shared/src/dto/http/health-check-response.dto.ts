import type { HealthStatus } from '../../enums/health-status.enum.js'

export interface HealthCheckResponseDto {
  status: HealthStatus
}
