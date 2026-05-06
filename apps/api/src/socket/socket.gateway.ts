import {
  SocketEventName,
  pingRequestSchema,
  pongResponseSchema,
  type PongResponseDto,
} from '@final-wire/shared';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/ws',
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(SocketGateway.name);

  handleConnection(client: Socket) {
    this.logger.debug(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage(SocketEventName.Ping)
  handlePing(
    @MessageBody() body: unknown,
    @ConnectedSocket() client: Socket,
  ): PongResponseDto {
    const received = body == null ? null : pingRequestSchema.parse(body);
    return pongResponseSchema.parse({
      event: SocketEventName.Pong,
      data: {
        message: SocketEventName.Pong,
        received,
        clientId: client.id,
      },
    });
  }
}
