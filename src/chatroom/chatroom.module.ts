import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';

@Module({
  providers: [ChatroomService],
  controllers: [ChatroomController]
})
export class ChatroomModule {}
