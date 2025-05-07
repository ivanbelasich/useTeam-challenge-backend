import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected : ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected : ${client.id}`);
  }

  @SubscribeMessage('cardMoved')
  handleCardMoved(
    client: Socket,
    payload: { cardId: string; sourceColumn: string; targetColumn: string },
  ) {
    this.server.emit('cardMoved', payload);
  }
}
