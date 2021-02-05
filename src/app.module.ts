import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ChatroomModule } from './chatroom/chatroom.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

//entities
import { User } from './users/entities/user.entity';
import { Chat } from './chatroom/entities/chat.entity';
import { ChatRoom } from './chatroom/entities/chatroom.entity';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST_DB,
      port: 3306,
      username: process.env.USER_DB,
      password: process.env.PASS_DB,
      database: process.env.NAME_DB,
      entities: [User, Chat, ChatRoom],
      synchronize: true,
    }),
    ChatroomModule,
    AuthModule,
    UsersModule,
    WebsocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
