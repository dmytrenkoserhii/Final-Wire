import { Controller, Get } from '@nestjs/common';
import {
  HealthStatus,
  type HealthCheckResponseDto,
  healthCheckResponseSchema,
} from '@final-wire/shared';
import { DatabaseService } from './database/database.service';

@Controller('health')
export class HealthController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async check(): Promise<HealthCheckResponseDto> {
    await this.databaseService.checkHealth();
    return healthCheckResponseSchema.parse({ status: HealthStatus.Ok });
  }
}
