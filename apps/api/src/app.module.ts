import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { DatabaseModule } from './database/database.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [SocketModule, DatabaseModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
