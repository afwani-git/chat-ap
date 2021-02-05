import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import { ChatroomModule } from '../chatroom/chatroom.module';

@Module({
  imports: [ChatroomModule],
  providers: [WebsocketGateway, WebsocketService],
})
export class WebsocketModule {}
