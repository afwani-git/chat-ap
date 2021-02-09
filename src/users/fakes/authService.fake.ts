import { CreateUserDto } from '../dto/create-user.dto';

export class UsersServiceFake {
  async create(_data: CreateUserDto): Promise<void> {}
  async findUserById(_id: number): Promise<void> {} 
  async findUserByUsername(_username: string): Promise<void> {}
}
