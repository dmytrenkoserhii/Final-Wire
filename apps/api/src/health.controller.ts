import { Controller, Get } from '@nestjs/common';
import {
  HealthStatus,
  type HealthCheckResponseDto,
  healthCheckResponseSchema,
} from '@final-wire/shared';

@Controller('health')
export class HealthController {
  @Get()
  check(): HealthCheckResponseDto {
    return healthCheckResponseSchema.parse({ status: HealthStatus.Ok });
  }
}
