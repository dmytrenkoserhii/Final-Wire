import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [SocketModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
