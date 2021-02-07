import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { ChatroomModule } from '../chatroom/chatroom.module';

@Module({
  imports: [ChatroomModule],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
