import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websockets/websocket.gateway';
import { GatewayModule } from './websockets/websocket.module';

@Module({
  imports: [GatewayModule],
  controllers: [],
  providers: [WebsocketGateway],
})
export class AppModule {}
