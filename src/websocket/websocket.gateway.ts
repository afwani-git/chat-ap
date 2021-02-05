import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WebsocketService } from './websocket.service';
import { ChatroomService } from '../chatroom/chatroom.service';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private websocketService: WebsocketService,
    private chatroomService: ChatroomService,
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('addChatRoom')
  async addChatRoom(client: Socket, payload: string): Promise<void> {
    const chatroom = await this.chatroomService.addChatRoom(payload);

    this.server.emit('addChatRoomClient', chatroom);
  }

  @SubscribeMessage('addChat')
  async addChat(
    client: Socket,
    payload: { userId: number; chatroomId: number; body: string },
  ): Promise<void> {
    const chat = await this.chatroomService.addChat(
      payload.userId,
      payload.chatroomId,
      payload.body,
    );

    this.server.emit('addChatClient', chat);
  }

  //loging (_server: Server)
  afterInit() {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  //...args: any[]
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
