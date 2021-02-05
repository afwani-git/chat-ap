import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ChatRoom } from './chatroom.entity';
import { User } from '../../users/entities/user.entity';

@Entity('chat')
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  body: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  send_at: Date;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  user: User;

  @ManyToOne(() => ChatRoom)
  chatroom: ChatRoom;
}
