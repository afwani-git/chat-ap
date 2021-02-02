import { Module } from '@nestjs/common';
import { ChatroomModule } from './chatroom/chatroom.module';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [
    ChatroomModule,
  ],
  controllers: [],
  providers: [WebsocketGateway],
})
export class AppModule {}
