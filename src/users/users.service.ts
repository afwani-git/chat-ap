import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(data: CreateUserDto): Promise<void> {
    const salt = await genSalt(10);
    data.password = await hash(data.password, salt);

    const newUser = this.userRepo.create(data);

    await this.userRepo.save(newUser);
  }

  findUserById(id: number): Promise<User> {
    return this.userRepo.findOne({
      where: {
        id,
      },
    });
  }

  findUserByUsername(username: string): Promise<User> {
    return this.userRepo.findOne({
      where: {
        username,
      },
    });
  }
}
