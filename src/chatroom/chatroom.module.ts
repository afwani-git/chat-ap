import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Chat } from './entities/chat.entity';
import { ChatRoom } from './entities/chatroom.entity';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, Chat]), UsersModule],
  providers: [ChatroomService],
  controllers: [ChatroomController],
  exports: [ChatroomService, TypeOrmModule],
})
export class ChatroomModule {}
