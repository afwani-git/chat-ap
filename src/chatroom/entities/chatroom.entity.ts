import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity('chatroom')
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Chat, (chat) => chat.chatroom, { onDelete: 'CASCADE' })
  chats: Chat[];
}
