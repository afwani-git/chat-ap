import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatroomService } from '../chatroom/chatroom.service';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private chatroomService: ChatroomService,
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('addChatRoom')
  async addChatRoom(
    client: Socket, 
    payload: string): Promise<void> {
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

  @SubscribeMessage('typing')
  async handleTyping(
    client: Socket, 
    payload: { username: string, currentRoom: string }
  ): Promise<void> {
    this.server.to(`rooms-${payload.currentRoom}`).emit('typingResponse', payload);
  }
  
  @SubscribeMessage('stopTyping')
  async handleStopTyping(
    client: Socket, 
    payload: { username: string, currentRoom: string }
  ): Promise<void> {
    this.server.to(`rooms-${payload.currentRoom}`).emit('stopTypingResponse', payload);
  }

  @SubscribeMessage('clientInRoom')
  async handleClientInRoom(
    client: Socket, 
    payload: string 
  ): Promise<void> {
    const nameRoom = `rooms-${payload}`;
    const data = client.nsp.adapter.rooms[nameRoom];
    this.server.emit('clientInRoomRespone', { data, currentRoomId: payload });
  }

  //handle room
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    client: Socket, 
    payload: string 
  ): Promise<void> {
    client.join(`rooms-${payload}`);
    this.server.emit('joinedRoom', payload);
  }

  @SubscribeMessage('leaveRoom')
  async handlerLeaveRoom(
    client: Socket, 
    payload: string
  ): Promise<void> {
    client.leave(`rooms-${payload}`);
    this.server.emit('leavedRoom', payload);
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
