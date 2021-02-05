import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { ChatRoom } from './entities/chatroom.entity';

@Injectable()
export class ChatroomService {
  constructor(
    @InjectRepository(ChatRoom) private chatRoomRepo: Repository<ChatRoom>,
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    private userService: UsersService,
  ) {}

  async fetchAllChatRoom(): Promise<ChatRoom[]> {
    return this.chatRoomRepo.find({
      relations: ['chats', 'chats.user'],
    });
  }

  async addChatRoom(name: string): Promise<ChatRoom> {
    const newData = this.chatRoomRepo.create({ name });

    const newChatRoom = await this.chatRoomRepo.save(newData);

    return newChatRoom;
  }

  async deleteChatRoom(id: number): Promise<void> {
    const chatRoom = await this.chatRoomRepo.findOne({
      id,
    });

    if (!chatRoom) throw new NotFoundException();

    await this.chatRoomRepo.remove(chatRoom);
  }

  async addChat(
    userId: number,
    chatRoomId: number,
    body: string,
  ): Promise<Chat> {
    const user = await this.userService.findUserById(userId);
    const chatroom = await this.chatRoomRepo.findOne({
      where: { id: chatRoomId },
    });
    if (!chatroom && !user) throw new NotFoundException();

    const newData = this.chatRepo.create({
      body,
      user,
      chatroom,
    });
    console.log(newData);
    return this.chatRepo.save(newData);
  }

  async deleteChat(
    userId: number,
    chatRoomId: number,
    chatId: number,
  ): Promise<void> {
    const user = await this.userService.findUserById(userId);
    const chatroom = await this.chatRoomRepo.findOne({
      where: { id: chatRoomId },
    });
    if (!chatroom && !user) throw new NotFoundException();

    const rows = await this.chatRepo.delete({
      id: chatId,
      user,
      chatroom,
    });

    if (!rows.affected) throw new NotFoundException();
  }
}
