import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, }  from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) {}

  async validateUser(data: CreateUserDto): Promise<User> {
    const user = await this.usersService.findUserByUsername(data.username);

    if (!user) throw new UnauthorizedException('user/password incorrect');

    const isCorrectPass = await this.comparePassword(user.password, data.password);

    if (!isCorrectPass)
      throw new UnauthorizedException('user/password incorrect');

    return user;
  }

  async comparePassword(encrypt: string, text: string): Promise<boolean>{
      return compare(text, encrypt);
  }
}
