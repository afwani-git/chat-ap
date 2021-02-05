import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async create(
    @Body() data: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.usersService.create(data);
    res.redirect('/auth/login');
  }
}
