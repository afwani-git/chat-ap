import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { hash, genSalt, compare } from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
