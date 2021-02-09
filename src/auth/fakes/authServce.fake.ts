import { CreateUserDto } from '../../users/dto/create-user.dto';

export class AuthServiceFake {
  async validateUser(_data: CreateUserDto): Promise<void> {}
  async comparePassword(_encrypt: string, _text: string): Promise<void> {}
}
